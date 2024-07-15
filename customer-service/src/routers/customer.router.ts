import { Router } from 'express'
import customerController from "../controllers/customer.controller";

const router = Router()

router.get('/customer', (req, res) => customerController.getAllCustomers(req, res))
export = router