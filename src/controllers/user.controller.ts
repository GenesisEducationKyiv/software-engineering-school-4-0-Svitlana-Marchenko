import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {UserAlreadyExistsError} from '../error/user.error'
import {IUserService} from "../services/user/user.service.interface";
import userService from "../services/user/user.service";

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
            if (error instanceof UserAlreadyExistsError) {
                logger.error(`Email ${email} is already in the database`)
                return res.status(409).json({
                    message: `Email ${email} is already in the database`,
                })
            } else {
                logger.error(
                    `Error adding email ${email} to the database: ${error.message}`
                )
                return res.status(500).json({error: error.message})
            }
        }
    }
}

export default new UserController(userService)