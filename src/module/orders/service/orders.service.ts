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
import { OrderProduct } from '../entity/order-product';
import { UserService } from 'src/module/users/service/user.service';
import { CreateOrderItemDto } from '../dto/create-order-item.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository,
    private readonly userService: UserService) 
   {}
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
  async createOrder(createorder:CreateOrderDto,dbTransaction:Transaction): Promise<Order>  {
    try {
      const orderProducts: OrderProduct[] = createorder.orderItems.map((item: CreateOrderItemDto) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
      const newOrder = await this.orderRepository.createOrderWithProduct({
        userid:createorder.userId,Price:createorder.price,address:createorder.address,
      },orderProducts,dbTransaction);
      await dbTransaction.commit();
      return newOrder;
    } catch (error) {
      console.log("error while creating User");
      await dbTransaction.rollback();
      throw new error;
    }
  }

  // list all orders by particular user
  async getAllOrdersByUser(options:FilteringDto) {
    const order=await this.orderRepository.getAllOrdersByUserId(options);
    return order;
  }

  //getorder by user3
  async findOneOrder(id: number) {
    const order=await this.orderRepository.getOrderById(id);
    return order;
  }

  //delete order by id
  async deleteOrder(id:number,dbTransaction:Transaction) {
    try {
    const order = await this.orderRepository.deleteOrderById(id,dbTransaction);
    await dbTransaction.commit();
    return order;
    } catch (error) {
      console.log("error while deleting User");
      await dbTransaction.rollback();
      throw new error;
    }
  }
  
  
}
