import { Router } from 'express'

import checkEmailMiddleware from "../middleware/email.middleware";
import userController from "../controllers/user.controller";


const router = Router()

router.post('', checkEmailMiddleware, (req, res) => userController.subscribeEmail(req, res))

export = router
