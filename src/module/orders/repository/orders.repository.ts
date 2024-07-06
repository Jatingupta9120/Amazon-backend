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
@Injectable()
export class OrderRepository {

    async getAllOrders(options: PaginationDto) {
            const order = await Order.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                limit: options.limit || 10,
                offset: options.offset || 0,
            });
            return order;
    }

    // async createOrderWithProduct( createOrderDto: CreateOrderDto,
    //     addProductDto: AddProductDto[],dbTransaction:Transaction){
    //         try {
    //             const order = await Order.create(createOrderDto,{dbtransaction})
    //             const products = addProductDto.map((addProductDto) => ({
    //                 ...addProductDto,
    //                 orderId: order.id,
    //             }));
    //             await Product.bulkCreate(products, { dbTransaction });
    //             await dbTransaction.commit();
    //             return order;
    //         } catch (error) {
                
    //         }

    // }


    async getAllOrdersByUserId(options:PaginatedOrdersResultDto) {
        return await Order.findAndCountAll({
            where: options.userid ? { id: options.userid } : {},
            include: [
                {
                    model: OrderProduct,
                    as: 'products',
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
            ],
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        });
    }

    //get order by id 
    async getOrderByid(id: string): Promise<Order> {
            const order = await Order.findByPk(id, {
            attributes: { exclude: ['createdAt'] },
            });
            if (!order) {
                throw new HttpException('order not found', HttpStatus.NOT_FOUND);   
            }
            return order;
    }

    //creation order
    async createOrder(params: CreateOrderDto, dbTransaction: Transaction): Promise<Order> {
        try {
          const newOrder = await Order.create({...params,},{ transaction: dbTransaction });
          await dbTransaction.commit();
          return newOrder;
        } catch (error) {
          await dbTransaction.rollback();
          console.error('Error creating order:', error);
          throw error;
        }
      }

    //delete order by Id
    async deleteOrderById(options:FilteringDto, dbTransaction: Transaction): Promise<void> {
        try {
            const order = await Order.findByPk(options.id);
            if (!order) {
                throw new HttpException('order not found', HttpStatus.NOT_FOUND);   
            }
            await order.destroy({transaction: dbTransaction});
            await dbTransaction.commit();
        } catch (error) {
            await dbTransaction.rollback();
            console.error('Error deleting order:', error); 
            throw error;
        }
    }
}

