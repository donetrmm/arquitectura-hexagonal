import express from 'express';
import { initProductController } from './product.controller';
import { initPromotionController } from './promotion.controller';
import { ProductRepositoryImpl } from '../infrastructure/product.repository';
import { PromotionRepositoryImpl } from '../infrastructure/promotion.repository';
import { ProductServiceImpl } from '../application/product.service';
import { PromotionServiceImpl } from '../application/promotion.service';
import { pool } from '../infrastructure/database'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Respositorios y servicios
const productRepository = new ProductRepositoryImpl(pool as any);
const promotionRepository = new PromotionRepositoryImpl();
const productService = new ProductServiceImpl(productRepository);
const promotionService = new PromotionServiceImpl(promotionRepository);

// Controllers
const productController = initProductController(productService);
const promotionController = initPromotionController(promotionService);

app.use(express.json());

// Rutas
app.use('/products', productController);
app.use('/promotions', promotionController); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
