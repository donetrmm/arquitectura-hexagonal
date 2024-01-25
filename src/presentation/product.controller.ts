import express, { Request, Response } from 'express';
import { ProductServiceImpl } from '../application/product.service';

const productController = express.Router();

export const initProductController = (productService: ProductServiceImpl) => {
  productController.get('/', async (req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  });

  productController.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  });

  productController.post('/', async (req: Request, res: Response) => {
    const newProduct = req.body;
    const success = await productService.getProductById(newProduct.id);
    if (success) {
      res.status(404).json({ error: 'Ya existe un producto con ese ID.' });
    } else {
      const createdProduct = await productService.createProduct(newProduct);
      res.status(201).json({ message: "Producto creado exitosamente!" });
    }
  });

  productController.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedProduct = req.body;
    const product = await productService.updateProduct(id, updatedProduct);
    if (product) {
      res.status(200).json({ message: "Producto actualizado exitosamente!"});
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  });

  productController.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = await productService.deleteProduct(id);
    if (success) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  });

  return productController;
};
