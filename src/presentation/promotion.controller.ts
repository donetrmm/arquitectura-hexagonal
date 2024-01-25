import express, { Request, Response } from 'express';
import { PromotionServiceImpl } from '../application/promotion.service';

const promotionController = express.Router();

export const initPromotionController = (promotionService: PromotionServiceImpl) => {
  promotionController.get('/', async (req: Request, res: Response) => {
    const promotions = await promotionService.getAllPromotions();
    res.json(promotions);
  });

  promotionController.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const promotion = await promotionService.getPromotionById(id);
    if (promotion) {
      res.json(promotion);
    } else {
      res.status(404).json({ error: 'Promoción no encontrada.' });
    }
  });

  promotionController.post('/', async (req: Request, res: Response) => {
    const newPromotion = req.body;
    const promotion = await promotionService.getPromotionById(newPromotion.id);
    if (promotion) {
      res.status(404).json({ error: 'Ya existe una promoción con ese ID.' });
    } else {
      const createdPromotion = await promotionService.createPromotion(newPromotion);
      res.status(201).json({ message: "Promoción creada exitosamente! "});
    }
  });

  promotionController.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPromotion = req.body;
    const promotion = await promotionService.updatePromotion(id, updatedPromotion);
    if (promotion) {
      res.status(200).json({ message: "Promoción actualizada exitosamente!"});
    } else {
      res.status(404).json({ error: 'Promoción no encontrada.' });
    }
  });

  promotionController.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = await promotionService.deletePromotion(id);
    if (success) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Promoción no encontrada.' });
    }
  });

  return promotionController;
};
