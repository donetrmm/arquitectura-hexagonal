import { Product } from '../domain/product.entity';
import { ProductRepository } from '../domain/product.repository';
import { OkPacket, ResultSetHeader, RowDataPacket, Pool } from 'mysql2/promise';

export class ProductRepositoryImpl implements ProductRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<Product[]> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT * FROM products');
    return rows as Product[];
  }

  async findById(id: string): Promise<Product | null> {
    const [rows] = await this.pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] as Product : null;
  }

  async create(product: Product): Promise<Product> {
    const [result] = await this.pool.query<ResultSetHeader>('INSERT INTO products SET ?', [product]);
    product.id = result.insertId.toString();
    return product;
  }

  async update(id: string, product: Product): Promise<Product | null> {
    const [result] = await this.pool.query<OkPacket>('UPDATE products SET ? WHERE id = ?', [product, id]);
    if (result.affectedRows === 0) return null;
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await this.pool.query<OkPacket>('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
