import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
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

  //get all order by userid
  @Get()
  @ResponseCustom(masterResponseName.GET_ALL_ORDERS)
  async findAllOrdersByUser(@Query() query: PaginatedOrdersResultDto) {
    return await this.ordersService.getAllOrdersByUser(query);
  }

  //get order by orderid
  @Get(':id')
  @ResponseCustom(masterResponseName.GET_ALL_ORDERS)
  asfindOneOrder(@Param('id',ParseIntPipe) id: number) {
    return this.ordersService.findOneOrder(id);
  }

  //delete order
  @Delete(':id')
  async removeOrder(@Param('id',ParseIntPipe) id:number, dbTransaction:Transaction) {
    return await this.ordersService.deleteOrder(id,dbTransaction);
  }
}
