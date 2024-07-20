import { Router } from 'express'
import customerController from "../controllers/customer.controller";

const router = Router()

router.post('/customer', (req, res) => customerController.addCustomer(req, res))
router.get('/customer', (req, res) => customerController.getAllCustomers(req, res))
router.delete('/customer', (req, res) => customerController.deleteCustomer(req, res))
export = router