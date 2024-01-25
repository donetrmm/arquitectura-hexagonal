import express from 'express';
import { initProductController } from './product.controller';
import { initPromotionController } from './promotion.controller'; // Importar el controlador de promociones
import { ProductRepositoryImpl } from '../infrastructure/product.repository';
import { PromotionRepositoryImpl } from '../infrastructure/promotion.repository'; // Importar el repositorio de promociones
import { ProductServiceImpl } from '../application/product.service';
import { PromotionServiceImpl } from '../application/promotion.service'; // Importar el servicio de promociones
import { pool } from '../infrastructure/database'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar repositorios y servicios
const productRepository = new ProductRepositoryImpl(pool as any);
const promotionRepository = new PromotionRepositoryImpl(); // Instanciar el repositorio de promociones
const productService = new ProductServiceImpl(productRepository);
const promotionService = new PromotionServiceImpl(promotionRepository); // Instanciar el servicio de promociones

// Inicializar controladores
const productController = initProductController(productService);
const promotionController = initPromotionController(promotionService); // Inicializar el controlador de promociones

// Configurar middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/products', productController);
app.use('/promotions', promotionController); // Agregar las rutas para las promociones

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
