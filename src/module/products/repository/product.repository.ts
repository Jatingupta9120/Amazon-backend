import { HttpException, HttpStatus, Injectable, Param } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";
import { CreateProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { Product } from "../entity/product.entity";
import { HttpExceptionWrapper } from "src/utils/error/error.http.wrapper";
import { MASTER_ERROR } from "src/constants/error";
import { Transaction } from "sequelize";
import { log } from "winston";
import { OrderProduct } from "src/module/orders/entity/order-product";
import { User } from "src/module/users/entity/user.entity";

@Injectable()
export class ProductRepository {


    async getAllProductsbyuserId(options: PaginationDto) {
            return await Product.findAndCountAll({
                include: [
                    {
                        model: User,
                        as: 'users',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
        
            });
    }



    async getProductsById(id: number): Promise<Product> {
            const products = await Product.findByPk(id, {
            include:[{model:User}],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
            if (!products) {
                throw new HttpExceptionWrapper(MASTER_ERROR.PRODUCT_NOT_EXIST);
            }
            return products;
    }



    async createProduct(params: CreateProductDto,dbTransaction: Transaction) {
        try {
        const product=await Product.findByPk(params.id);
        if(product){
            throw new HttpException('product already exists',HttpStatus.CONFLICT);
        }
        const newProduct = await Product.create(params,{transaction:dbTransaction});
        await dbTransaction.commit();
        return newProduct;
        } catch (error) {
            console.log("error occur during product creation");
            await dbTransaction.rollback();
            throw new error;
        }
    }



    async updateProduct(productDto:UpdateProductDto,dbTransaction: Transaction){
        try {
            const { id, ...updatedValues } = productDto;
    
            const product = await Product.findByPk(id, { transaction: dbTransaction });
            if (!product) {
                throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            }
            const [numRowsUpdated, updatedProducts] = await Product.update(updatedValues, {
                where: { id: id }, 
                returning: true,
                transaction: dbTransaction,
            });
            if (numRowsUpdated === 0) {
                throw new Error('Failed to update product');
            }
            await dbTransaction.commit();
    
            return `Product successfully updated: ${updatedProducts}`;
        } catch (error) {
            await dbTransaction.rollback();
            console.error('Error updating product:', error);
            throw error;
        }
    }


    async deleteProduct(id:number,dbTransaction: Transaction) {
            try {
            const product = await Product.destroy({where: { id },transaction: dbTransaction});
            // await product.destroy();
            await dbTransaction.commit();
            return `product sucessfully deleted ${product}`;
            } catch (error) {
            await dbTransaction.rollback();
            throw new error;
        }
    }


}
