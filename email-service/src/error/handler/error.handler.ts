import { BaseError } from '../base.error'
import loggerBase from '../../helpers/logger/logger.base'
import { LogLevel } from '../../helpers/logger/logger.interface'

export const errorHandler = (err: Error) => {
   if (!(err instanceof BaseError)) {
      loggerBase.log(
         LogLevel.Error,
         `Error: ${err.message}\nStack: ${err.stack}`,
      )
      return
   }

   const { errors, logging } = err as BaseError

   if (logging) {
      loggerBase.log(
         LogLevel.Error,
         `Errors: ${JSON.stringify(errors, null, 2)}\nStack: ${err.stack}`,
      )
   }
}
