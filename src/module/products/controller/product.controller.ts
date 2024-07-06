import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { PaginationDto } from "../dto/pagination.dto";
import { query } from "express";
import { CreateProductDto } from "../dto/product.dto";
import { UpdateProductDto } from "../dto/update.dto";
import { Response as ResponseCustom } from '../../../utils/response/response.decorator';
import { masterResponseName } from "src/constants/response/responseCode/user";
import { Transaction } from "sequelize";

@Controller()
export class ProductController {
    constructor(private readonly productService:ProductService){}

    //GET ALL PRODUCTS
    @Get()
    @ResponseCustom(masterResponseName.GET_ALL_PRODUCTS)
    async getAllProducts(@Query() query: PaginationDto) {
      return this.productService.getAllProductsByUserId(query);
    }

    
    //GET PRODUCT BY ID
    @Get('/:id')
    @ResponseCustom(masterResponseName.GET_ALL_PRODUCTS)
    async getProductById(@Param('id') id: PaginationDto) {
        return this.productService.getAllProductsById(id);
    }


    //CREATE PRODUCTS
    @Post()
    @ResponseCustom(masterResponseName.PRODUCT_CREATED)
    async createProduct(@Query() product: CreateProductDto,dbTransaction:Transaction) {
        return this.productService.createProduct(product,dbTransaction);
    }

    //UPDATE PRODUCTS
    @Put('/:id')
    // @ResponseCustom(userresponseName.UPDATE_ALL_USER
    async replaceProduct(@Param('id')id:PaginationDto, @Body() product:UpdateProductDto,dbTransaction:Transaction){
        return this.productService.updateProduct(id, product,dbTransaction);
    }

    //DELETE PRODUCTS
    @Delete('/:id')
    // @ResponseCustom(userresponseName.DELETED_USER)
    async removeProduct(@Param('id')id:PaginationDto,dbTransaction:Transaction){
        return await this.productService.deleteProduct(id,dbTransaction);
    }

}