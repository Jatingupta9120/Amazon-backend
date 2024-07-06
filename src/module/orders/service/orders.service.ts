import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto, PaginatedOrdersResultDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { FilteringDto } from '../dto/filtering.dto';
import { OrderRepository } from '../repository/orders.repository';
import { or, Transaction } from 'sequelize';
import { HttpExceptionWrapper } from 'src/utils/error/error.http.wrapper';
import { MASTER_ERROR } from 'src/constants/error';
import { Order } from '../entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}
//   async createOrderNM(
//     createOrder: CreateOrderDto,
//     addProduct: AddProductDto[],
// ) {
//     console.log('=============service', { createOrder });
//     try {
//         return this.ordersRepository.createOrderWithProducts(
//             createOrder,
//             addProduct,
//         );
//     } catch (err) {
//         console.log({ err });
//     }
// }
  //create order
  async createOrder(createOrderDto: CreateOrderDto,dbTransaction:Transaction) {
    try {
      const newOrder = await this.orderRepository.createOrder(createOrderDto,dbTransaction);
      await dbTransaction.commit();
      return newOrder;
    } catch (error) {
      console.log("error while creating User");
      await dbTransaction.rollback();
      throw new error;
    }
  }

  //list all orders

  async findAllOrders(paginationDto: PaginationDto){
    const order=await this.orderRepository.getAllOrders(paginationDto);
    return order;
  }


  // list all orders by particular user
  async getAllOrdersByUser(paginationDto: PaginatedOrdersResultDto) {
    const order=await this.orderRepository.getAllOrdersByUserId(paginationDto);
    return order;
  }

  //getorder by user
  async findOneOrder(id: string) {
    const order=await this.orderRepository.getOrderByid(id);
    return order;
  }

  //delete order by id
  async deleteOrder(options: FilteringDto,dbTransaction:Transaction) {
    try {
    const order = await this.orderRepository.deleteOrderById(options,dbTransaction);
    await dbTransaction.commit();
    return order;
    } catch (error) {
      console.log("error while deleting User");
      await dbTransaction.rollback();
      throw new error;
    }
  }
  
  
}
