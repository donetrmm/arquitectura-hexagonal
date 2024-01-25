import { Promotion } from './promotion.entity';

export interface PromotionRepository {
  findAll(): Promise<Promotion[]>;
  findById(id: string): Promise<Promotion | null>;
  create(promotion: Promotion): Promise<Promotion>;
  update(id: string, promotion: Promotion): Promise<Promotion | null>;
  delete(id: string): Promise<boolean>;
}
