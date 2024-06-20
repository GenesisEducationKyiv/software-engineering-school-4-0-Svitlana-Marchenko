import { Router } from 'express'

import checkEmailMiddleware from "../middleware/emailMiddleware";
import {UserController} from "../controllers/user.controller";
import {UserService} from "../services/user/user.service";

const router = Router()

const userController = new UserController(new UserService())

router.post('', checkEmailMiddleware, (req, res) => userController.subscribeEmail(req, res))

export = router
