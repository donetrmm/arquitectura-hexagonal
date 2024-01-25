import { Product } from './product.entity';

export interface ProductService {
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(product: Product): Promise<Product>;
  updateProduct(id: string, product: Product): Promise<Product | null>;
  deleteProduct(id: string): Promise<boolean>;
}
