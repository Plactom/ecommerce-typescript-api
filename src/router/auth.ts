import { Router } from 'express'
import AuthController from '../controller/AuthController'
import UserController from '../controller/UserController'

const router = Router()

router.post('/signin', AuthController.signIn)
router.post('/signup', UserController.newUser)

export default router