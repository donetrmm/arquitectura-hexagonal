import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion.repository';
import { pool } from './database';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export class PromotionRepositoryImpl implements PromotionRepository {
  async findAll(): Promise<Promotion[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM promotions');
    return rows.map(row => this.rowToPromotion(row));
  }

  async findById(id: string): Promise<Promotion | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM promotions WHERE id = ?', [id]);
    return rows.length > 0 ? this.rowToPromotion(rows[0]) : null;
  }

  async create(promotion: Promotion): Promise<Promotion> {
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO promotions SET ?', [promotion]);
    promotion.id = result.insertId.toString();
    return promotion;
  }

  async update(id: string, promotion: Promotion): Promise<Promotion | null> {
    const [result] = await pool.query<ResultSetHeader>('UPDATE promotions SET ? WHERE id = ?', [promotion, id]);
    if (result.affectedRows === 0) return null;
    return promotion;
  }

  async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM promotions WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  private rowToPromotion(row: RowDataPacket): Promotion {
    return {
      id: row.id.toString(),
      description: row.description.toString(),
    };
  }
}
