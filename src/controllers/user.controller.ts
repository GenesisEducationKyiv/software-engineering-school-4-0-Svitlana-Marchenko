import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {IUserService} from "../services/user/user.service.interface";
import {UserService} from "../services/user/user.service";
import {dataSource} from "../dataSource";
import {User} from "../entity/user.entity";
import {errorHandler} from "../error/handler/error.handler";

export class UserController {

    constructor(private userService: IUserService) {}

    async subscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
         try {
            await this.userService.subscribeEmail(email)
            logger.info(`Email ${email} was added to the database`)
            return res.status(200).json({
                message: `New email was added to the database`,
            })
        } catch (error) {
             errorHandler(error, req, res)
        }
    }
}

export default new UserController(new UserService(dataSource.getRepository(User)))