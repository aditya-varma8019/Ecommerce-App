import express from 'express';
import { requireSignin, adminSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, getSingleProductPhotoController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';


const router = express.Router();

//routes
// create product
router.post('/create-product', requireSignin, adminSignIn, formidable(), createProductController);

// get products
router.get('/get-product', getProductController)

// single product
router.get('/get-product/:slug', getSingleProductController)

// get photo
router.get('/product-photo/:pid', getSingleProductPhotoController)

// delete product
router.delete('/delete-product/:pid', requireSignin, adminSignIn, deleteProductController);

// update product
router.put('/update-product/:pid', requireSignin, adminSignIn, formidable(), updateProductController);

export default router;