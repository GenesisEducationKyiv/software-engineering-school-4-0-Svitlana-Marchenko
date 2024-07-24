import { Router } from 'express'
import RateController from '../controllers/rate/rate.controller'

const router = Router()

router.get('', (req, res) => RateController.getRate(req, res))

export = router
