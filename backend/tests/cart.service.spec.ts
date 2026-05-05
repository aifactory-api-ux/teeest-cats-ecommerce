import { CartService } from '../cart-service/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '../shared/dtos/cart.dto';

describe('CartService', () => {
  let cartService: CartService;

  const createMockToken = (userId: string): string => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({ id: userId, email: `${userId}@example.com` })).toString('base64');
    const signature = Buffer.from(`${header}.${payload}.secret`).toString('base64');
    return `${header}.${payload}.${signature}`;
  };

  beforeEach(() => {
    cartService = new CartService();
  });

  describe('getCart', () => {
    it('should return a new cart for anonymous user', async () => {
      const result = await cartService.getCart('invalid-token');

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe('anonymous');
      expect(result.items).toEqual([]);
    });

    it('should return cart for authenticated user', async () => {
      const token = createMockToken('user123');

      const result = await cartService.getCart(token);

      expect(result).toBeDefined();
      expect(result.userId).toBe('user123');
    });

    it('should return same cart for same user', async () => {
      const token = createMockToken('user456');

      const cart1 = await cartService.getCart(token);
      const cart2 = await cartService.getCart(token);

      expect(cart1.id).toBe(cart2.id);
    });
  });

  describe('addItem', () => {
    it('should add a new item to cart', async () => {
      const token = createMockToken('user789');
      const addToCartDto: AddToCartDto = {
        productId: 'product-001',
        quantity: 2,
      };

      const result = await cartService.addItem(token, addToCartDto);

      expect(result).toBeDefined();
      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe('product-001');
      expect(result.items[0].quantity).toBe(2);
    });

    it('should increase quantity when adding existing item', async () => {
      const token = createMockToken('user增量');
      const addToCartDto1: AddToCartDto = {
        productId: 'product-002',
        quantity: 1,
      };
      const addToCartDto2: AddToCartDto = {
        productId: 'product-002',
        quantity: 3,
      };

      await cartService.addItem(token, addToCartDto1);
      const result = await cartService.addItem(token, addToCartDto2);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].quantity).toBe(4);
    });
  });

  describe('updateItem', () => {
    it('should update item quantity', async () => {
      const token = createMockToken('user-update');
      const addToCartDto: AddToCartDto = {
        productId: 'product-update',
        quantity: 1,
      };
      const updateDto: UpdateCartItemDto = {
        quantity: 5,
      };

      await cartService.addItem(token, addToCartDto);
      const result = await cartService.updateItem(token, 'product-update', updateDto);

      expect(result.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is zero or negative', async () => {
      const token = createMockToken('user-remove');
      const addToCartDto: AddToCartDto = {
        productId: 'product-remove',
        quantity: 2,
      };
      const updateDto: UpdateCartItemDto = {
        quantity: 0,
      };

      await cartService.addItem(token, addToCartDto);
      const result = await cartService.updateItem(token, 'product-remove', updateDto);

      expect(result.items.find(i => i.productId === 'product-remove')).toBeUndefined();
    });

    it('should throw error when cart not found', async () => {
      const token = createMockToken('nonexistent-user');
      const updateDto: UpdateCartItemDto = { quantity: 5 };

      await expect(
        cartService.updateItem(token, 'product-123', updateDto),
      ).rejects.toThrow('Cart not found');
    });

    it('should throw error when item not in cart', async () => {
      const token = createMockToken('user-item-missing');
      await cartService.getCart(token);
      const updateDto: UpdateCartItemDto = { quantity: 5 };

      await expect(
        cartService.updateItem(token, 'nonexistent-product', updateDto),
      ).rejects.toThrow('Item not found in cart');
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', async () => {
      const token = createMockToken('user-remove-item');
      const addToCartDto: AddToCartDto = {
        productId: 'product-to-remove',
        quantity: 2,
      };

      await cartService.addItem(token, addToCartDto);
      const result = await cartService.removeItem(token, 'product-to-remove');

      expect(result.items.find(i => i.productId === 'product-to-remove')).toBeUndefined();
    });

    it('should throw error when cart not found', async () => {
      const token = createMockToken('user-no-cart');

      await expect(
        cartService.removeItem(token, 'product-123'),
      ).rejects.toThrow('Cart not found');
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      const token = createMockToken('user-clear');
      await cartService.addItem(token, { productId: 'product-1', quantity: 1 });
      await cartService.addItem(token, { productId: 'product-2', quantity: 2 });

      const result = await cartService.clearCart(token);

      expect(result.items).toEqual([]);
    });
  });
});