import {Request, Response} from 'express'
import {IUserService} from "../services/user/user.service.interface";
import {errorHandler} from "../error/handler/error.handler";
import loggerBase from "../helpers/logger/logger.base";

export class UserController {

    constructor(private userService: IUserService) {}

    async subscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
         try {
            await this.userService.subscribeEmail(email)
             loggerBase.log('info', `Email ${email} was added to the database`)
            return res.status(201).json({
                message: `New email was added to the database`,
            })
        } catch (error) {
             errorHandler(error, req, res)
        }
    }
}

export default new UserController(userService)