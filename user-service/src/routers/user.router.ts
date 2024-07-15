import { Router } from 'express'
import checkEmailMiddleware from "../middlewares/email.middleware";
import userController from "../controllers/user.controller";

const router = Router()

router.post('/subscribe', checkEmailMiddleware, (req, res) => userController.subscribeEmail(req, res))
router.post('/unsubscribe', checkEmailMiddleware, (req, res) => userController.unsubscribeEmail(req, res));
router.post('/resubscribe', checkEmailMiddleware, (req, res) => userController.resubscribeEmail(req, res));
router.get('/user', (req, res) => userController.getAllUsers(req, res))
router.get('/user/email', (req, res) => userController.getAllUsersEmails(req, res))
export = router