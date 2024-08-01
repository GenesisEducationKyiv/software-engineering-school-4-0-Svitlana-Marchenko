import {Request, Response} from 'express'
import {IUserService} from "../services/user/user.service.interface";
import userService from "../services/user/user.service";
import {errorHandler} from "../error/handler/error.handler";
import {LogLevel} from "../helpers/logger/logger.interface";
import loggerBase from "../helpers/logger/logger.base";

export class UserController {
   constructor(private userService: IUserService) {}

   async subscribeEmail(req: Request, res: Response): Promise<Response> {
      const { email } = req.body
      try {
         await this.userService.subscribeEmail(email)
         loggerBase.log(
            LogLevel.Info,
            `Email ${email} was added to the database`,
         )
         return res.status(201).json({
            message: `New email was added to the database`,
         })
      } catch (error) {
         errorHandler(error, req, res)
      }
   }

   async getAllUsers(req: Request, res: Response): Promise<Response> {
      try {
         const users = await this.userService.getAllUsers()
         loggerBase.log(
            LogLevel.Debug,
            `Getting (${users.length}) users from db`,
         )
         return res.status(200).json(users)
      } catch (error) {
         loggerBase.log(LogLevel.Error, `Error getting users: ${error.message}`)
         return errorHandler(error, req, res)
      }
   }

   async getAllUsersEmails(req: Request, res: Response): Promise<Response> {
      try {
         const emails = await this.userService.getAllUsersEmails()
         loggerBase.log(LogLevel.Debug, `Getting all users emails from db`)
         return res.status(200).json(emails)
      } catch (error) {
         loggerBase.log(
            LogLevel.Error,
            `Error getting users emails: ${error.message}`,
         )
         return errorHandler(error, req, res)
      }
   }
}

export default new UserController(userService)
