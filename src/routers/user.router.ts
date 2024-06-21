import { Router } from 'express'

import checkEmailMiddleware from "../middleware/emailMiddleware";
import userController from "../controllers/user.controller";


const router = Router()

router.post('', checkEmailMiddleware, (req, res) => userController.subscribeEmail(req, res))

export = router
