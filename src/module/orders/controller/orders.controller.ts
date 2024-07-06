import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto, PaginatedOrdersResultDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { FilteringDto } from '../dto/filtering.dto';
import { Response as ResponseCustom } from '../../../utils/response/response.decorator';
import { masterResponseName } from 'src/constants/response/responseCode/user';
import {  Transaction } from 'sequelize';
import { Order } from '../entity/order.entity';
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //create order
  @Post()
  @ResponseCustom(masterResponseName.ORDER_CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto,dbTransaction:Transaction) {
    return this.ordersService.createOrder(createOrderDto,dbTransaction);
  }

  //get allOrders
  @Get()
  @ResponseCustom(masterResponseName.GET_ALL_ORDERS)
  findAllOrders(@Query() query: PaginationDto) {
    return this.ordersService.findAllOrders(query);
  }

  //get order by userid
  @Get()
  @ResponseCustom(masterResponseName.GET_ALL_ORDERS)
  async findAllOrdersbyUser(@Query() query: PaginatedOrdersResultDto) {
    return await this.ordersService.getAllOrdersByUser(query);
  }

  //get order by orderid
  @Get(':id')
  @ResponseCustom(masterResponseName.GET_ALL_ORDERS)
  findOneOrder(@Param('id') id: string) {
    return this.ordersService.findOneOrder(id);
  }

  //delete order
  @Delete(':id')
  async removeOrder(@Param('id') id: FilteringDto,dbTransaction:Transaction) {
    return await this.ordersService.deleteOrder(id,dbTransaction);
  }
}
