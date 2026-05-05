import { Controller, Get, Post, Put, Delete, Body, Param, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, AddToCartDto, UpdateCartItemDto } from '../shared/dtos/cart.dto';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Headers('authorization') authHeader: string): Promise<Cart> {
    const token = authHeader?.replace('Bearer ', '');
    return this.cartService.getCart(token);
  }

  @Post('items')
  @HttpCode(HttpStatus.CREATED)
  async addItem(
    @Headers('authorization') authHeader: string,
    @Body() addToCartDto: AddToCartDto
  ): Promise<Cart> {
    const token = authHeader?.replace('Bearer ', '');
    return this.cartService.addItem(token, addToCartDto);
  }

  @Put('items/:productId')
  async updateItem(
    @Headers('authorization') authHeader: string,
    @Param('productId') productId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ): Promise<Cart> {
    const token = authHeader?.replace('Bearer ', '');
    return this.cartService.updateItem(token, productId, updateCartItemDto);
  }

  @Delete('items/:productId')
  async removeItem(
    @Headers('authorization') authHeader: string,
    @Param('productId') productId: string
  ): Promise<Cart> {
    const token = authHeader?.replace('Bearer ', '');
    return this.cartService.removeItem(token, productId);
  }
}