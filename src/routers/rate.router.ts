import { Router } from 'express'
import RateController from '../controllers/rate.controller'

const router = Router()

router.get('', RateController.getRate)

export = router
