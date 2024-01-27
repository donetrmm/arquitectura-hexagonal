import express, { Request, Response } from 'express';
import { ProductServiceImpl } from '../application/product.service';

const productController = express.Router();

export const initProductController = (productService: ProductServiceImpl) => {
  productController.get('/', (req: Request, res: Response) => {
    (async () => {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    })();
  });

  productController.get('/:id', (req: Request, res: Response) => {
    (async () => {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    })();
  });

  productController.post('/', (req: Request, res: Response) => {
    (async () => {
      const newProduct = req.body;
      const success = await productService.getProductById(newProduct.id);
      if (success) {
        res.status(404).json({ error: 'Ya existe un producto con ese ID.' });
      } else {
        await productService.createProduct(newProduct);
        res.status(201).json({ message: "Producto creado exitosamente!" });
      }
    })();
  });

  productController.put('/:id', (req: Request, res: Response) => {
    (async () => {
      const { id } = req.params;
      const updatedProduct = req.body;
      const product = await productService.updateProduct(id, updatedProduct);
      if (product) {
        res.status(200).json({ message: "Producto actualizado exitosamente!" });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    })();
  });

  productController.delete('/:id', (req: Request, res: Response) => {
    (async () => {
      const { id } = req.params;
      const success = await productService.deleteProduct(id);
      if (success) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ error: 'Producto no encontrado.' });
      }
    })();
  });

  return productController;
};
