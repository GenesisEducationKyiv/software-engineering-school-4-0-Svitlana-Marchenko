import { BaseError } from "../base.error";
import logger from "../../helpers/logger";

export const errorMailHandler = (err: Error) => {
    if (!(err instanceof BaseError)) {
        logger.error(`Error: ${err.message}\nStack: ${err.stack}`);
        return;
    }

    const { errors, logging } = err as BaseError;

    if (logging) {
        logger.error(`Errors: ${JSON.stringify(errors, null, 2)}\nStack: ${err.stack}`);
    }
};
