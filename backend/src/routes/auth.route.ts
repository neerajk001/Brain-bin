import { signup } from '../controller/auth.controller';
import { signin } from '../controller/auth.controller';
import { logout } from '../controller/auth.controller';
import express from 'express';


const router =express.Router()
router.post('/sign-up',signup)
router.post('/sign-in',signin)
router.post('/logout', logout)


export default router