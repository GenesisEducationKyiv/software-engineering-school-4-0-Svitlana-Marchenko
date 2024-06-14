import { Router } from 'express';
import { getRate } from '../controllers/rate.controller';

const router = Router();

router.get('', getRate);

export = router;
