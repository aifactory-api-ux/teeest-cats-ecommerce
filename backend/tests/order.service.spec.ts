import { OrderService } from '../order-service/order.service';
import { CreateOrderDto } from '../shared/dtos/order.dto';

describe('OrderService', () => {
  let orderService: OrderService;

  const createMockToken = (userId: string): string => {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
    const payload = Buffer.from(JSON.stringify({ id: userId, email: `${userId}@example.com` })).toString('base64');
    const signature = Buffer.from(`${header}.${payload}.secret`).toString('base64');
    return `${header}.${payload}.${signature}`;
  };

  beforeEach(() => {
    orderService = new OrderService();
  });

  describe('createOrder', () => {
    it('should create an order successfully', async () => {
      const token = createMockToken('order-user');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: '123 Test Street, Test City',
        paymentMethod: 'stripe',
      };

      const result = await orderService.createOrder(token, createOrderDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.userId).toBe('order-user');
      expect(result.status).toBe('pending');
      expect(result.shippingAddress).toBe(createOrderDto.shippingAddress);
      expect(result.items).toBeDefined();
      expect(result.total).toBeGreaterThan(0);
    });

    it('should generate payment intent ID', async () => {
      const token = createMockToken('payment-user');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: '456 Test Ave',
        paymentMethod: 'stripe',
      };

      const result = await orderService.createOrder(token, createOrderDto);

      expect(result.paymentIntentId).toBeDefined();
      expect(result.paymentIntentId).toMatch(/^pi_/);
    });

    it('should set createdAt and updatedAt timestamps', async () => {
      const token = createMockToken('timestamp-user');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: '789 Test Blvd',
        paymentMethod: 'stripe',
      };

      const result = await orderService.createOrder(token, createOrderDto);

      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });
  });

  describe('getOrders', () => {
    it('should return empty list when no orders exist', async () => {
      const token = createMockToken('no-orders-user');

      const result = await orderService.getOrders(token);

      expect(result).toBeDefined();
      expect(result.orders).toEqual([]);
    });

    it('should return user orders sorted by creation date', async () => {
      const token = createMockToken('multi-order-user');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: 'Test Address',
        paymentMethod: 'stripe',
      };

      await orderService.createOrder(token, createOrderDto);
      await orderService.createOrder(token, createOrderDto);

      const result = await orderService.getOrders(token);

      expect(result.orders.length).toBe(2);
      expect(result.orders[0].createdAt).toBeGreaterThanOrEqual(result.orders[1].createdAt);
    });

    it('should not return orders from other users', async () => {
      const token1 = createMockToken('user-A');
      const token2 = createMockToken('user-B');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: 'Test Address',
        paymentMethod: 'stripe',
      };

      await orderService.createOrder(token1, createOrderDto);
      await orderService.createOrder(token2, createOrderDto);

      const result = await orderService.getOrders(token1);

      expect(result.orders.length).toBe(1);
      expect(result.orders[0].userId).toBe('user-A');
    });
  });

  describe('getOrder', () => {
    it('should return order by id for owner', async () => {
      const token = createMockToken('order-owner');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: 'Owner Address',
        paymentMethod: 'stripe',
      };

      const created = await orderService.createOrder(token, createOrderDto);
      const result = await orderService.getOrder(token, created.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(created.id);
    });

    it('should throw error when order not found', async () => {
      const token = createMockToken('user-no-order');

      await expect(orderService.getOrder(token, 'non-existent-order-id')).rejects.toThrow(
        'Order not found',
      );
    });

    it('should throw error when user tries to access another users order', async () => {
      const token1 = createMockToken('user-1');
      const token2 = createMockToken('user-2');
      const createOrderDto: CreateOrderDto = {
        shippingAddress: 'User 1 Address',
        paymentMethod: 'stripe',
      };

      const created = await orderService.createOrder(token1, createOrderDto);

      await expect(orderService.getOrder(token2, created.id)).rejects.toThrow(
        'Unauthorized access to order',
      );
    });
  });
});