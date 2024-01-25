import { Promotion } from '../domain/promotion.entity';
import { PromotionRepository } from '../domain/promotion.repository';
import { PromotionService } from '../domain/promotion.service';

export class PromotionServiceImpl implements PromotionService {
  constructor(private readonly promotionRepository: PromotionRepository) {}

  async getAllPromotions(): Promise<Promotion[]> {
    return this.promotionRepository.findAll();
  }

  async getPromotionById(id: string): Promise<Promotion | null> {
    return this.promotionRepository.findById(id);
  }

  async createPromotion(promotion: Promotion): Promise<Promotion> {
    return this.promotionRepository.create(promotion);
  }

  async updatePromotion(id: string, promotion: Promotion): Promise<Promotion | null> {
    return this.promotionRepository.update(id, promotion);
  }

  async deletePromotion(id: string): Promise<boolean> {
    return this.promotionRepository.delete(id);
  }
}
