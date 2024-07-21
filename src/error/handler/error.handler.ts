import {Request, Response } from "express";
import { BaseError } from "../base.error";
import UserAlreadyExistError from "../types/userAlreadyExist.error";
import BadRequestError from "../types/badRequest.error";
import RateApiError from "../types/rateApi.error";
import loggerBase from "../../helpers/logger/logger.base";

export const errorHandler = (err: Error,
                             req: Request,
                             res: Response
) => {

    if(!(err instanceof BaseError)){
        loggerBase.log('error', `Errors: ${JSON.stringify(err.message, null, 2)}\nStack: ${err.stack}`);
        return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    }

    const {errors, logging } = err;

    if (logging) {
        loggerBase.log('error', `Errors: ${JSON.stringify(err.errors, null, 2)}\nStack: ${err.stack}`);
    }

    if(err instanceof UserAlreadyExistError) {
        return res.status(409).send({ errors });
    } else if ( err instanceof BadRequestError) {
        return res.status(400).send({ errors });
    } else if ( err instanceof RateApiError) {
        return res.status(500).send({ errors });
    }

    return res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};