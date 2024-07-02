import { Router } from 'express'

import checkEmailMiddleware from "../middlewares/email.middleware";
import userController from "../controllers/user.controller";


const router = Router()

router.post('', checkEmailMiddleware, (req, res) => userController.subscribeEmail(req, res))
router.get('', (req, res) => userController.getAllUsers(req, res))
export = router
