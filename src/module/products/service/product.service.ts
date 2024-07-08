import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";
import { CreateProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { ProductRepository } from "../repository/product.repository";
import { Transaction } from "sequelize";
import { Product } from "../entity/product.entity";
@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    //getAllproducts by userid
    async getAllProductsByUserId(options: PaginationDto): Promise<Product[]> {
        const product = await this.productRepository.getAllProductsbyuserId(options);
        if (!product) {
            // throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }


    //get all products by productid
    async getAllProductsById(id: number){
        const product = await this.productRepository.getProductsById(id);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            // throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
        }
        return product;
    }


    //Create new User
    async createProduct(productInformation: CreateProductDto,dbTransaction:Transaction):Promise<Product> {
        try {
            const newProduct = await this.productRepository.createProduct(productInformation,dbTransaction);
            await dbTransaction.commit();
            return newProduct; 
        } catch (error) {
            console.log("error while creating Product");
            await dbTransaction.rollback();
            throw new error;
        }
        
    }  


    //delete user
    async deleteProduct(id: number,dbTransaction:Transaction) {
        try {
        const deleteProduct = await this.productRepository.deleteProduct(id,dbTransaction);
        await dbTransaction.commit();
        return deleteProduct;
        } catch (error) {
            console.log("error while creating User");
            await dbTransaction.rollback();
            throw new error;
        }
    }


    //update product 
    async updateProduct(product:UpdateProductDto,dbTransaction:Transaction){
        try {
        const replaceProduct=await this.productRepository.updateProduct(product,dbTransaction);
        await dbTransaction.commit();
        return replaceProduct;
        } catch (error) {
            console.log("error while updating product");
            await dbTransaction.rollback();
            throw new error;
        }
    }
    
    
}