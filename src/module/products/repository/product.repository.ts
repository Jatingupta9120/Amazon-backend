import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";
import { CreateProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { Product } from "../entity/product.entity";
import { HttpExceptionWrapper } from "src/utils/error/error.http.wrapper";
import { MASTER_ERROR } from "src/constants/error";
import { Transaction } from "sequelize";
import { log } from "winston";
import { OrderProduct } from "src/module/orders/entity/order-product";

@Injectable()
export class ProductRepository {


    async getAllProductsbyuserId(options: PaginationDto) {
            return await Product.findAndCountAll({
                where: options.userid ? { id: options.userid } : {},
                include: [
                    {
                        model: OrderProduct,
                        as: 'orders',
                        attributes: { exclude: ['createdAt', 'updatedAt'] }
                    },
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] },
        
            });
    }



    async getAllProductsById(options: PaginationDto): Promise<Product> {
            const products = await Product.findByPk(options.id, {
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            });
            if (!products) {
                throw new HttpExceptionWrapper(MASTER_ERROR.PRODUCT_NOT_EXIST);
            }
            return products;
    }



    async createProduct(params: CreateProductDto,dbTransaction: Transaction): Promise<Product> {
        try {
        const newProduct = await Product.create({...params},{ transaction: dbTransaction });
        await dbTransaction.commit();
        return newProduct;
        } catch (error) {
            console.log("error occur during product creation");
            await dbTransaction.rollback();
            throw new error;
        }
    }



    async updateProduct(options:PaginationDto,product:UpdateProductDto,dbTransaction: Transaction){
        try {
            const updatedProduct= await Product.update(product,{where:{id:options.userid},transaction: dbTransaction});
            await dbTransaction.commit();
            return `product sucessfully deleted ${updatedProduct}`;
        } catch (error) {
            await dbTransaction.rollback();
            throw new error;
        }
    }


    async deleteProduct(id:string,dbTransaction: Transaction) {
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
