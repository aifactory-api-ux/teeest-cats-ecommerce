import { Controller, Get, Post, Put, Delete, Param, Query, Body, HttpException, HttpStatus, Headers, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class ApiGatewayController {
  private readonly services: Record<string, string> = {
    'api/auth': 'http://auth-service:8001',
    'api/products': 'http://product-service:8002',
    'api/categories': 'http://product-service:8002',
    'api/cart': 'http://cart-service:8003',
    'api/orders': 'http://order-service:8004',
    'api/reviews': 'http://review-service:8005',
    'api/legal': 'http://legal-service:8006',
    'api/contact': 'http://contact-service:8007',
  };

  @Get('health')
  health() {
    return { status: 'ok', service: 'api-gateway' };
  }

  @Get('api/:service/:path*')
  async get(@Param() params: any, @Query() query: any, @Headers() headers: any) {
    return this.proxy(params.service, 'GET', params.path, query, null, headers);
  }

  @Post('api/:service/:path*')
  async post(@Param() params: any, @Body() body: any, @Headers() headers: any) {
    return this.proxy(params.service, 'POST', params.path, null, body, headers);
  }

  @Put('api/:service/:path*')
  async put(@Param() params: any, @Body() body: any, @Headers() headers: any) {
    return this.proxy(params.service, 'PUT', params.path, null, body, headers);
  }

  @Delete('api/:service/:path*')
  async delete(@Param() params: any, @Body() body: any, @Headers() headers: any) {
    return this.proxy(params.service, 'DELETE', params.path, null, body, headers);
  }

  private async proxy(service: string, method: string, path: string, query: any, body: any, headers: any) {
    const baseUrl = this.services[`api/${service}`];
    if (!baseUrl) {
      throw new HttpException(`Service not found: ${service}`, HttpStatus.NOT_FOUND);
    }
    const url = `${baseUrl}/api/${service}/${path || ''}`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new HttpException(`Failed to proxy to ${service}`, HttpStatus.BAD_GATEWAY);
    }
  }
}