import { Injectable } from '@nestjs/common';
import { Cart, CartItem, AddToCartDto, UpdateCartItemDto } from '../shared/dtos/cart.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  private carts: Map<string, Cart> = new Map();

  private getUserIdFromToken(token: string): string {
    try {
      const payload = Buffer.from(token.split('.')[1], 'base64').toString();
      const decoded = JSON.parse(payload);
      return decoded.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }

  async getCart(token: string): Promise<Cart> {
    const userId = this.getUserIdFromToken(token);
    let cart = this.carts.get(userId);

    if (!cart) {
      cart = this.createNewCart(userId);
    }

    return cart;
  }

  async addItem(token: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const userId = this.getUserIdFromToken(token);
    let cart = this.carts.get(userId);

    if (!cart) {
      cart = this.createNewCart(userId);
    }

    const existingItem = cart.items.find(item => item.productId === addToCartDto.productId);

    if (existingItem) {
      existingItem.quantity += addToCartDto.quantity;
    } else {
      cart.items.push({ productId: addToCartDto.productId, quantity: addToCartDto.quantity });
    }

    cart.updatedAt = new Date().toISOString();
    this.carts.set(userId, cart);

    return cart;
  }

  async updateItem(token: string, productId: string, updateCartItemDto: UpdateCartItemDto): Promise<Cart> {
    const userId = this.getUserIdFromToken(token);
    const cart = this.carts.get(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const item = cart.items.find(i => i.productId === productId);

    if (!item) {
      throw new Error('Item not found in cart');
    }

    if (updateCartItemDto.quantity <= 0) {
      cart.items = cart.items.filter(i => i.productId !== productId);
    } else {
      item.quantity = updateCartItemDto.quantity;
    }

    cart.updatedAt = new Date().toISOString();
    this.carts.set(userId, cart);

    return cart;
  }

  async removeItem(token: string, productId: string): Promise<Cart> {
    const userId = this.getUserIdFromToken(token);
    const cart = this.carts.get(userId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(i => i.productId !== productId);
    cart.updatedAt = new Date().toISOString();
    this.carts.set(userId, cart);

    return cart;
  }

  async clearCart(token: string): Promise<Cart> {
    const userId = this.getUserIdFromToken(token);
    const cart = this.createNewCart(userId);
    this.carts.set(userId, cart);
    return cart;
  }

  private createNewCart(userId: string): Cart {
    return {
      id: uuidv4(),
      userId,
      items: [],
      updatedAt: new Date().toISOString(),
    };
  }
}