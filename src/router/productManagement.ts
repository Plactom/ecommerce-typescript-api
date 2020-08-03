import { Router } from 'express'
import ProductController from '../controller/ProductController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

router.post('/newProduct', [checkJwt, checkRole(['ADMIN'])], ProductController.newProduct)

export default router