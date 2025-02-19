import express from 'express';
import { LoginController, RegisterController } from '../Controller/authController.js';
const router=express.Router();


//register user

router.post("/register",RegisterController);

//login user
router.post("/login",LoginController);




export default router;