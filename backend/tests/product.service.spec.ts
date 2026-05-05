import { ProductService } from '../product-service/product.service';
import { CreateProductDto, UpdateProductDto, ProductQueryParams } from '../shared/dtos/product.dto';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  describe('getProducts', () => {
    it('should return all products without filters', async () => {
      const result = await productService.getProducts({});

      expect(result).toBeDefined();
      expect(result.products).toBeDefined();
      expect(result.total).toBeGreaterThan(0);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should filter products by category', async () => {
      const query: ProductQueryParams = { category: 'Electronics' };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      result.products.forEach(p => {
        expect(p.category).toBe('Electronics');
      });
    });

    it('should filter products by brand', async () => {
      const query: ProductQueryParams = { brand: 'AudioMax' };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      result.products.forEach(p => {
        expect(p.brand).toBe('AudioMax');
      });
    });

    it('should filter products by minPrice', async () => {
      const query: ProductQueryParams = { minPrice: 5000 };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      result.products.forEach(p => {
        expect(p.price).toBeGreaterThanOrEqual(5000);
      });
    });

    it('should filter products by maxPrice', async () => {
      const query: ProductQueryParams = { maxPrice: 5000 };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      result.products.forEach(p => {
        expect(p.price).toBeLessThanOrEqual(5000);
      });
    });

    it('should sort products by price ascending', async () => {
      const query: ProductQueryParams = { sort: 'price' };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      for (let i = 1; i < result.products.length; i++) {
        expect(result.products[i - 1].price).toBeLessThanOrEqual(result.products[i].price);
      }
    });

    it('should sort products by price descending', async () => {
      const query: ProductQueryParams = { sort: '-price' };

      const result = await productService.getProducts(query);

      expect(result.products).toBeDefined();
      for (let i = 1; i < result.products.length; i++) {
        expect(result.products[i - 1].price).toBeGreaterThanOrEqual(result.products[i].price);
      }
    });

    it('should paginate results', async () => {
      const query: ProductQueryParams = { page: 1, limit: 2 };

      const result = await productService.getProducts(query);

      expect(result.products.length).toBeLessThanOrEqual(2);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(2);
    });
  });

  describe('getProduct', () => {
    it('should return product by id', async () => {
      const productsResult = await productService.getProducts({});
      const firstProduct = productsResult.products[0];

      const result = await productService.getProduct(firstProduct.id);

      expect(result).toBeDefined();
      expect(result.id).toBe(firstProduct.id);
      expect(result.name).toBe(firstProduct.name);
    });

    it('should throw error when product not found', async () => {
      await expect(productService.getProduct('non-existent-id')).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'New Product',
        description: 'A new test product',
        price: 5999,
        imageUrl: 'https://example.com/new-product.jpg',
        category: 'Electronics',
        brand: 'TestBrand',
        stock: 50,
      };

      const result = await productService.createProduct(createProductDto);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.name).toBe(createProductDto.name);
      expect(result.price).toBe(createProductDto.price);
      expect(result.rating).toBe(0);
      expect(result.reviewCount).toBe(0);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const productsResult = await productService.getProducts({});
      const firstProduct = productsResult.products[0];

      const updateDto: UpdateProductDto = {
        name: 'Updated Product Name',
        price: 7999,
      };

      const result = await productService.updateProduct(firstProduct.id, updateDto);

      expect(result).toBeDefined();
      expect(result.name).toBe('Updated Product Name');
      expect(result.price).toBe(7999);
    });

    it('should throw error when updating non-existent product', async () => {
      const updateDto: UpdateProductDto = { name: 'Test' };

      await expect(productService.updateProduct('non-existent-id', updateDto)).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('deleteProduct', () => {
    it('should delete an existing product', async () => {
      const productsResult = await productService.getProducts({});
      const firstProduct = productsResult.products[0];

      const result = await productService.deleteProduct(firstProduct.id);

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it('should throw error when deleting non-existent product', async () => {
      await expect(productService.deleteProduct('non-existent-id')).rejects.toThrow(
        'Product not found',
      );
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      const result = await productService.getCategories();

      expect(result).toBeDefined();
      expect(result.categories).toBeDefined();
      expect(result.categories.length).toBeGreaterThan(0);
    });
  });
});