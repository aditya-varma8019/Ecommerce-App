import express from 'express';
import { forgotPasswordController, loginController, registerController, testController } from '../controllers/authController.js';
import { adminSignIn, requireSignin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

router.get('/test', requireSignin, adminSignIn, testController);

// forgot password
router.post('/forgot-password', forgotPasswordController);

//protected route auth
router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ ok: true })
})

export default router;