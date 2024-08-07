import { Request, Response } from 'express'
import { BaseError } from '../base.error'
import UserAlreadyExistError from '../types/userAlreadyExist.error'
import BadRequestError from '../types/badRequest.error'
import loggerBase from '../../helpers/logger/logger.base'
import { LogLevel } from '../../helpers/logger/logger.interface'

export const errorHandler = (err: Error, req: Request, res: Response) => {
   if (!(err instanceof BaseError)) {
      loggerBase.log(
         LogLevel.Error,
         `Errors: ${JSON.stringify(err.message, null, 2)}\nStack: ${err.stack}`,
      )
      return res
         .status(500)
         .send({ errors: [{ message: 'Something went wrong' }] })
   }

   const { errors, logging } = err

   if (logging) {
      loggerBase.log(
         LogLevel.Error,
         `Errors: ${JSON.stringify(err.errors, null, 2)}\nStack: ${err.stack}`,
      )
   }

   if (err instanceof UserAlreadyExistError) {
      return res.status(409).send({ errors })
   } else if (err instanceof BadRequestError) {
      return res.status(400).send({ errors })
   }

   if (err instanceof UserAlreadyExistError) {
      return res.status(409).send({ errors })
   } else if (err instanceof BadRequestError) {
      return res.status(400).send({ errors })
   }

   return res
      .status(500)
      .send({ errors: [{ message: 'Something went wrong' }] })
}

export const serviceErrorHandler = (err: Error) => {
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
