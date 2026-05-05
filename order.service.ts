import { Injectable } from '@nestjs/common';
import { Order, CreateOrderDto, OrderListResponse, OrderStatus } from '../shared/dtos/order.dto';
import { CartItem } from '../shared/dtos/cart.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  private orders: Map<string, Order> = new Map();

  private getUserIdFromToken(token: string): string {
    try {
      const payload = Buffer.from(token.split('.')[1], 'base64').toString();
      const decoded = JSON.parse(payload);
      return decoded.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }

  async createOrder(token: string, createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = this.getUserIdFromToken(token);
    const now = new Date().toISOString();

    const mockItems: CartItem[] = [
      { productId: 'sample-product-1', quantity: 2 },
      { productId: 'sample-product-2', quantity: 1 },
    ];

    const total = mockItems.reduce((sum, item) => {
      return sum + (item.quantity * 9999);
    }, 0);

    const order: Order = {
      id: uuidv4(),
      userId,
      items: mockItems,
      total,
      status: 'pending',
      shippingAddress: createOrderDto.shippingAddress,
      paymentIntentId: `pi_${uuidv4()}`,
      createdAt: now,
      updatedAt: now,
    };

    this.orders.set(order.id, order);

    setTimeout(() => {
      const existingOrder = this.orders.get(order.id);
      if (existingOrder && existingOrder.status === 'pending') {
        existingOrder.status = 'paid';
        existingOrder.updatedAt = new Date().toISOString();
        this.orders.set(order.id, existingOrder);
      }
    }, 5000);

    return order;
  }

  async getOrders(token: string): Promise<OrderListResponse> {
    const userId = this.getUserIdFromToken(token);
    const userOrders = Array.from(this.orders.values())
      .filter(order => order.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return { orders: userOrders };
  }

  async getOrder(token: string, orderId: string): Promise<Order> {
    const userId = this.getUserIdFromToken(token);
    const order = this.orders.get(orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.userId !== userId) {
      throw new Error('Unauthorized access to order');
    }

    return order;
  }
}