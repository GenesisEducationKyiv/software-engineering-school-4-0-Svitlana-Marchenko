import { Router } from 'express'
import UserController from '../controllers/user.controller'
import checkEmailMiddleware from "../middleware/emailMiddleware";

const router = Router()

router.post('', checkEmailMiddleware, UserController.subscribeEmail)

export = router
