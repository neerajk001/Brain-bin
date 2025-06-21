import express from 'express'
import { content, dltContent } from "../controller/content.controller";
import { protectedRoutes } from '../middleware/protectedRoutes';
import { getContent } from '../controller/content.controller';
import { shareContent } from '../controller/content.controller';


const router =express.Router()
router.post('/content',protectedRoutes as any, content)
router.get('/content/', protectedRoutes as any, getContent )
router.delete('/content/:id', protectedRoutes as any, dltContent )
router.post('/brain/share',protectedRoutes as any ,shareContent)


export default router