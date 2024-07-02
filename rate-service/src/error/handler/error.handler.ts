import {Request, Response } from "express";
import { BaseError } from "../base.error";
import logger from "../../helpers/logger";
import RateApiError from "../types/rateApi.error";

export const errorHandler = (err: Error,
                             req: Request,
                             res: Response
) => {

    if(!(err instanceof BaseError)){
        logger.error(`Errors: ${JSON.stringify(err.message, null, 2)}\nStack: ${err.stack}`);
        return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    }

    const {errors, logging } = err;

    if (logging) {
        logger.error(`Errors: ${JSON.stringify(err.errors, null, 2)}\nStack: ${err.stack}`);
    }

    if ( err instanceof RateApiError) {
        return res.status(500).send({ errors });
    }

    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};