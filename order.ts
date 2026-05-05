import { CartItem } from './cart';

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentIntentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  shippingAddress: string;
  paymentMethod: 'stripe';
}

export interface OrderListResponse {
  orders: Order[];
}