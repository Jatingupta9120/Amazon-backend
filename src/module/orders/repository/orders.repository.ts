import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateOrderDto, PaginatedOrdersResultDto } from "../dto/create-order.dto";
import { FilteringDto } from "../dto/filtering.dto";
import { PaginationDto } from "../dto/pagination.dto";
import { Order } from "../entity/order.entity";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { OrderProduct } from "../entity/order-product";
// import { Model, Transaction } from "sequelize";
import { Model,Op, Transaction } from 'sequelize';
import { Product } from "src/module/products/entity/product.entity";
import { User } from "src/module/users/entity/user.entity";
import { ProductService } from "src/module/products/service/product.service";
// import { User } from "src/model/userModel";
@Injectable()
export class OrderRepository {
    constructor(private productService: ProductService){}
    // async getAllOrders(options: PaginationDto) {
    //         const order = await Order.findAll({
    //             attributes: { exclude: ['createdAt', 'updatedAt'] },
    //             limit: options.limit || 10,
    //             offset: options.offset || 0,
    //         });
    //         return order;
    // }

    async createOrderWithProduct( createOrderDto:  Partial<Order>,
        orderproduct: Partial<OrderProduct[]>,dbTransaction:Transaction){
            try {
                const order = await Order.create(createOrderDto,{dbtransaction:Transaction,include:[OrderProduct]})
                for (const data of orderproduct) {
                    const product = await this.productService.getAllProductsById(Number(data.productId));
                    if(!product) {
                      throw new HttpException(`Product with id ${data.id} not found`,HttpStatus.NOT_FOUND);
                    }

                    else {
                        await OrderProduct.create({ ...createOrderDto, id: createOrderDto.id }, { dbtransaction:Transaction });

                    }
                  }
                await dbTransaction.commit();
                return order;
            } catch (error) {
                await dbTransaction.rollback();
                throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
            }

    }


    async getAllOrdersByUserId(options:PaginatedOrdersResultDto) {
        return await OrderProduct.findAndCountAll({
            where:{id:options.userid},
            include: [
                {
                    model: User,
                    as: 'users',
                    attributes: { exclude: ['createdAt'] },
                },
                {
                    model: Product,
                    as: 'products',
                    attributes: { exclude: ['createdAt'] },
                },
            ],
            
        });
    }

    //get order by id 
    async getOrderById(id: number){
            const order = await OrderProduct.findByPk(id, {
            attributes: { exclude: ['createdAt'] },
            });
            if (!order) {
                throw new HttpException('order not found', HttpStatus.NOT_FOUND);   
            }
            return order;
    }

    //creation order
    //TODO
    // async createOrder(params: CreateOrderDto, dbTransaction: Transaction) {
    //     const createOrder=await Order.create()
    //     try {
    //         if(createOrder){

    //       const newOrder = await Order.create({...params,},{ transaction: dbTransaction });
    //       await dbTransaction.commit();
    //       return newOrder;
    //     } catch (error) {
    //       await dbTransaction.rollback();
    //       console.error('Error creating order:');
    //       throw error;
    //     }
    //   }

    //delete order by Id
    async deleteOrderById(id:number, dbTransaction: Transaction) {
        try {
            await dbTransaction.rollback();
            await dbTransaction.commit();
            const order = await Order.findByPk(id,{transaction:dbTransaction});
            if (!order) {
                throw new HttpException('order not found', HttpStatus.NOT_FOUND);   
            }
            await OrderProduct.destroy({
                where :{orderId: id}, transaction: dbTransaction,
            });
            await Order.destroy({
                where :{id:id},
                transaction: dbTransaction,
            });
            await dbTransaction.commit();
        } catch (error) {
            await dbTransaction.rollback();
            console.error('Error deleting order:'); 
            throw error;
        }
    }
}

