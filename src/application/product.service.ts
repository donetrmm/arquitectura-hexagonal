import { Product } from '../domain/product.entity';
import { ProductRepository } from '../domain/product.repository';
import { ProductService } from '../domain/product.service';

export class ProductServiceImpl implements ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  async updateProduct(id: string, product: Product): Promise<Product | null> {
    return this.productRepository.update(id, product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}
