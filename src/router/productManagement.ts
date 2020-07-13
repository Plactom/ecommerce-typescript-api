import { Router } from 'express'
import ProductController from '../controller/ProductController'
import { checkJwt } from '../middlewares/checkJwt'

const router = Router()

router.get('/listAll', [checkJwt], ProductController.listAll)

export default router