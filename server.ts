import express from 'express';
import { initProductController } from './src/presentation/product.controller';
import { initPromotionController } from './src/presentation/promotion.controller';
import { ProductRepositoryImpl } from './src/infrastructure/product.repository';
import { PromotionRepositoryImpl } from './src/infrastructure/promotion.repository';
import { ProductServiceImpl } from './src/application/product.service';
import { PromotionServiceImpl } from './src/application/promotion.service';
import { pool } from './src/infrastructure/database';
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();
app.disable("x-powered-by");

const PORT = 3000;

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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
