import { BaseError } from "../base.error";
import loggerBase from "../../helpers/logger/logger.base";

export const errorMailHandler = (err: Error) => {
    if (!(err instanceof BaseError)) {
        loggerBase.log('error', `Error: ${err.message}\nStack: ${err.stack}`);
        return;
    }

    const { errors, logging } = err as BaseError;

    if (logging) {
        loggerBase.log('error', `Errors: ${JSON.stringify(errors, null, 2)}\nStack: ${err.stack}`);
    }
};
