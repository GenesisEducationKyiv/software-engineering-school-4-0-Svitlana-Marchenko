import { Request, Response } from 'express';
import rateService from '../services/rate.service';
import logger from '../helpers/logger';

export const getRate = async (req: Request, res: Response): Promise<Response> => {
    try {
        logger.debug(`Getting currency rate`);
        const exchangeRate = await rateService.getExchangeRate();
        res.status(200).json(exchangeRate);
    } catch (error) {
        switch (true){
            case error instanceof Error:
                logger.error('Error fetching exchange rate: ' + error.message);
                return res.status(400).json({ message: 'Error fetching exchange rate' });
            default:
                logger.error('Unexpected error: ' + String(error));
                return res.status(500).json({ message: 'Unexpected error' });
        }
    }
};

