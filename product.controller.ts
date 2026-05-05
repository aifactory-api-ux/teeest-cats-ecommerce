import { Controller, Get, Post, Put, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryParams,
  ProductListResponse,
} from '../shared/dtos/product.dto';
import { Category, CategoryListResponse } from '../shared/dtos/category.dto';

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  async getProducts(@Query() query: ProductQueryParams): Promise<ProductListResponse> {
    return this.productService.getProducts(query);
  }

  @Get('products/:id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getProduct(id);
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete('products/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProduct(@Param('id') id: string): Promise<{ success: boolean }> {
    return this.productService.deleteProduct(id);
  }

  @Get('categories')
  async getCategories(): Promise<CategoryListResponse> {
    return this.productService.getCategories();
  }
}