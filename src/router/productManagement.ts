import { Router } from 'express'
import ProductController from '../controller/ProductController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

router.post('/newProduct', [checkJwt, checkRole(['ADMIN'])], ProductController.newProduct)
router.put('/updateProduct', [checkJwt, checkRole(['ADMIN'])], ProductController.updateProduct)

export default router