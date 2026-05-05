import { Controller, Get, Post, Body, Param, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order, CreateOrderDto, OrderListResponse } from '../shared/dtos/order.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(
    @Headers('authorization') authHeader: string,
    @Body() createOrderDto: CreateOrderDto
  ): Promise<Order> {
    const token = authHeader?.replace('Bearer ', '');
    return this.orderService.createOrder(token, createOrderDto);
  }

  @Get()
  async getOrders(@Headers('authorization') authHeader: string): Promise<OrderListResponse> {
    const token = authHeader?.replace('Bearer ', '');
    return this.orderService.getOrders(token);
  }

  @Get(':id')
  async getOrder(
    @Headers('authorization') authHeader: string,
    @Param('id') id: string
  ): Promise<Order> {
    const token = authHeader?.replace('Bearer ', '');
    return this.orderService.getOrder(token, id);
  }
}