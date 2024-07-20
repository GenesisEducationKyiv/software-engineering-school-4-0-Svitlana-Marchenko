import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {IUserService} from "../services/user/user.service.interface";
import userService from "../services/user/user.service";
import {errorHandler} from "../error/handler/error.handler";
import {UserMapper} from "../mapper/user.mapper";

export class UserController {

    constructor(private userService: IUserService) {}

    async subscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
         try {
             await this.userService.subscribeEmail(email)
             logger.info(`Email ${email} was added to newUser queue`)
             return res.status(200).json({ message: 'Subscription request received', email });
        } catch (error) {
             errorHandler(error, req, res)
        }
    }

    async addUser(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
        try {
            const user = await this.userService.addUser(email)
            logger.info(`Email ${email} was added to db`)
            return res.status(202).json(user);
        } catch (error) {
            errorHandler(error, req, res)
        }
    }

    async resubscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
        try {
            const user = await this.userService.resubscribeEmail(email)
            logger.info(`User with email ${email} was resubscribed`)
            return res.status(200).json(user)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }

    async unsubscribeEmail(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
        try {
            const user = await this.userService.unsubscribeEmail(email)
            logger.info(`User with email ${email} was unsubscribed`)
            return res.status(200).json(user)
        } catch (error) {
            errorHandler(error, req, res)
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.userService.getAllUsers();
            logger.debug(`Getting (${users.length}) users from db`);
            return res.status(200).json(users.map(x => UserMapper.toDTO(x)));
        } catch (error) {
            logger.error(`Error getting users: ${error.message}`);
            return errorHandler(error, req, res);
        }
    }

    async getAllUsersEmails(req: Request, res: Response): Promise<Response> {
        try {
            const emails = await this.userService.getAllUsersEmails();
            logger.debug(`Getting all users emails from db`);
            return res.status(200).json(emails);
        } catch (error) {
            logger.error(`Error getting users emails: ${error.message}`);
            return errorHandler(error, req, res);
        }
    }

    async deleteUser(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        try {
            await this.userService.deleteUserByEmail(email);
            logger.info(`User with email ${email} was deleted from db`);
            return res.status(200).json({ message: `User with email ${email} was deleted.` });
        } catch (error) {
            return errorHandler(error, req, res);
        }
    }
}

export default new UserController(userService)