import { Router } from 'express'
import ProductController from '../controller/ProductController'
import { checkJwt } from '../middlewares/checkJwt'
import { checkRole } from '../middlewares/checkRole'

const router = Router()

router.get('/listAll', [checkJwt, checkRole(['ADMIN'])], ProductController.listAll)

export default router