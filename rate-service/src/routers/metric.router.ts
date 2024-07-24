import { Router } from 'express'
import metricController from "../controllers/metric/metric.controller";

const router = Router()

router.get('', (req, res) => metricController.getMetric(req, res))

export = router