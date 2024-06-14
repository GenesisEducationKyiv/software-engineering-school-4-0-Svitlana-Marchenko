import { Router } from 'express';
import { subscribeEmail } from '../controllers/user.controller';

const router = Router();

router.post('', subscribeEmail);

export = router