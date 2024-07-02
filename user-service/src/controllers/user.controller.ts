import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {IUserService} from "../services/user.service.interface";
import userService from "../services/user.service";
import {errorHandler} from "../error/handler/error.handler";

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

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.getAllUsers();
            logger.debug(`Getting all users from db, found ${users.length} users`);
            return res.status(200).json(users);
        } catch (error) {
            logger.error(`Error getting users: ${error.message}`);
            return errorHandler(error, req, res);
        }
    }
}

export default new UserController(userService)