import {Request, Response} from 'express'
import logger from '../../helpers/logger'
import {IUserService} from "../../service/user.service.interface";
import userService from "../../service/user.service";
import {errorHandler} from "../../error/handler/error.handler";

export class UserController {

    constructor(private userService: IUserService) {}

    async subscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
         try {
            await this.userService.subscribeEmail(email)
            logger.info(`Email ${email} was added to the database`)
            return res.status(201).json({
                message: `New email was added to the database`,
            })
        } catch (error) {
             errorHandler(error, req, res)
        }
    }
}

export default new UserController(userService)