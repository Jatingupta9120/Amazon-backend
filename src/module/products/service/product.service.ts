import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PaginationDto } from "../dto/pagination.dto";
import { CreateProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { ProductRepository } from "../repository/product.repository";
import { Transaction } from "sequelize";
@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    //getAllproducts
    async getAllProductsByUserId(options: PaginationDto) {
        const product = await this.productRepository.getAllProductsbyuserId(options);
        if (!product) {
            // throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        return product;
    }


    //get all user by id
    async getAllProductsById(options: PaginationDto){
        const product = await this.productRepository.getAllProductsById(options);
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
            // throw new HttpExceptionWrapper(USER_ERROR.USER_NOT_EXIST);
        }
        return product;
    }


    //Create new User
    async createProduct(options: CreateProductDto,dbTransaction:Transaction) {
        try {
            const newProduct = await this.productRepository.createProduct(options,dbTransaction);
            await dbTransaction.commit();
            return newProduct; 
        } catch (error) {
            console.log("error while creating Product");
            await dbTransaction.rollback();
            throw new error;
        }
        
    }  


    //delete user
    async deleteProduct(options: PaginationDto,dbTransaction:Transaction) {
        try {
        const deleteProduct = await this.productRepository.deleteProduct(options.id,dbTransaction);
        await dbTransaction.commit();
        return deleteProduct;
        } catch (error) {
            console.log("error while creating User");
            await dbTransaction.rollback();
            throw new error;
        }
    }


    //update product 
    async updateProduct(options:PaginationDto,product:UpdateProductDto,dbTransaction:Transaction){
        try {
        const replaceProduct=await this.productRepository.updateProduct(options, product,dbTransaction);
        await dbTransaction.commit();
        return replaceProduct;
        } catch (error) {
            console.log("error while updating product");
            await dbTransaction.rollback();
            throw new error;
        }
    }
    
    
}