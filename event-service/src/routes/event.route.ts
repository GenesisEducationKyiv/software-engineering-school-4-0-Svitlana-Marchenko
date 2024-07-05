import { Router } from 'express'
import eventController from "../controllers/event.controller";

const router = Router()

router.post('/event',  (req, res) => eventController.addEvent(req, res))
export = router