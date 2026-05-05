import { Injectable } from '@nestjs/common';
import {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQueryParams,
  ProductListResponse,
} from '../shared/dtos/product.dto';
import { Category, CategoryListResponse } from '../shared/dtos/category.dto';
import { paginate, getPaginationParams } from '../shared/utils/pagination.util';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  private products: Map<string, Product> = new Map();
  private categories: Map<string, Category> = new Map();

  constructor() {
    this.seedCategories();
    this.seedProducts();
  }

  private seedCategories() {
    const categories = [
      { id: uuidv4(), name: 'Electronics', description: 'Electronic devices and accessories', imageUrl: 'https://example.com/categories/electronics.jpg' },
      { id: uuidv4(), name: 'Clothing', description: 'Fashion and apparel', imageUrl: 'https://example.com/categories/clothing.jpg' },
      { id: uuidv4(), name: 'Home & Garden', description: 'Home improvement and garden', imageUrl: 'https://example.com/categories/home.jpg' },
      { id: uuidv4(), name: 'Sports', description: 'Sports equipment and gear', imageUrl: 'https://example.com/categories/sports.jpg' },
    ];
    categories.forEach(cat => this.categories.set(cat.id, cat));
  }

  private seedProducts() {
    const now = new Date().toISOString();
    const sampleProducts: CreateProductDto[] = [
      { name: 'Wireless Headphones', description: 'High-quality wireless headphones with noise cancellation', price: 9999, imageUrl: 'https://example.com/products/headphones.jpg', category: 'Electronics', brand: 'AudioMax', stock: 50 },
      { name: 'Smart Watch', description: 'Fitness tracking smart watch', price: 19999, imageUrl: 'https://example.com/products/smartwatch.jpg', category: 'Electronics', brand: 'TechTime', stock: 30 },
      { name: 'Running Shoes', description: 'Comfortable running shoes for athletes', price: 7999, imageUrl: 'https://example.com/products/shoes.jpg', category: 'Sports', brand: 'SpeedRun', stock: 100 },
      { name: 'Cotton T-Shirt', description: 'Soft cotton t-shirt for everyday wear', price: 2999, imageUrl: 'https://example.com/products/tshirt.jpg', category: 'Clothing', brand: 'ComfortWear', stock: 200 },
    ];

    sampleProducts.forEach(p => {
      const product: Product = {
        id: uuidv4(),
        ...p,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100),
        createdAt: now,
        updatedAt: now,
      };
      this.products.set(product.id, product);
    });
  }

  async getProducts(query: ProductQueryParams): Promise<ProductListResponse> {
    let products = Array.from(this.products.values());

    if (query.category) {
      products = products.filter(p => p.category === query.category);
    }

    if (query.brand) {
      products = products.filter(p => p.brand === query.brand);
    }

    if (query.minPrice !== undefined) {
      products = products.filter(p => p.price >= query.minPrice!);
    }

    if (query.maxPrice !== undefined) {
      products = products.filter(p => p.price <= query.maxPrice!);
    }

    if (query.sort) {
      const sortField = query.sort.replace('-', '');
      const sortOrder = query.sort.startsWith('-') ? -1 : 1;
      products.sort((a, b) => {
        if (sortField === 'price') {
          return (a.price - b.price) * sortOrder;
        }
        if (sortField === 'rating') {
          return (a.rating - b.rating) * sortOrder;
        }
        return 0;
      });
    }

    const total = products.length;
    const { page, limit } = getPaginationParams({ page: query.page, limit: query.limit });
    const paginatedResult = paginate(products, total, page, limit);

    return {
      products: paginatedResult.data,
      total: paginatedResult.total,
      page: paginatedResult.page,
      limit: paginatedResult.limit,
    };
  }

  async getProduct(id: string): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const now = new Date().toISOString();
    const product: Product = {
      id: uuidv4(),
      ...createProductDto,
      rating: 0,
      reviewCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.products.set(product.id, product);
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = this.products.get(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const updated: Product = {
      ...product,
      ...updateProductDto,
      updatedAt: new Date().toISOString(),
    };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<{ success: boolean }> {
    if (!this.products.has(id)) {
      throw new Error('Product not found');
    }
    this.products.delete(id);
    return { success: true };
  }

  async getCategories(): Promise<CategoryListResponse> {
    return {
      categories: Array.from(this.categories.values()),
    };
  }
}