import { Promotion } from '../domain/promotion.entity';

export interface PromotionService {
  getAllPromotions(): Promise<Promotion[]>;
  getPromotionById(id: string): Promise<Promotion | null>;
  createPromotion(promotion: Promotion): Promise<Promotion>;
  updatePromotion(id: string, promotion: Promotion): Promise<Promotion | null>;
  deletePromotion(id: string): Promise<boolean>;
}
