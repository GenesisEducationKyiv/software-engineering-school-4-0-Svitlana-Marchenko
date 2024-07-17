import {Request, Response} from 'express'
import logger from '../helpers/logger'
import {ICustomerService} from "../services/customer/customer.service.interface";
import {CustomerMapper} from "../mappers/customer.mapper";
import {errorHandler} from "../errors/handler/error.handler";
import customerService from "../services/customer/customer.service";

export class CustomerController {

    constructor(private customerService: ICustomerService) {}

    async getAllCustomers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await this.customerService.getAllUsers();
            logger.debug(`Getting (${users.length}) users from db`);
            return res.status(200).json(users.map(x => CustomerMapper.toDTO(x)));
        } catch (error) {
            return errorHandler(error, req, res);
        }
    }

    async addCustomer(req: Request, res: Response): Promise<Response> {
        const {email} = req.body
        try {
            const user = await this.customerService.addCustomer(email)
            logger.info(`Customer with email ${email} was added to db`)
            return res.status(202).json(CustomerMapper.toDTO(user));
        } catch (error) {
            errorHandler(error, req, res)
        }
    }

    async deleteCustomer(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;
        try {
            await this.customerService.deleteCustomerByEmail(email);
            logger.info(`Customer with email ${email} was deleted from db`);
            return res.status(200).json({ message: `Customer with email ${email} was deleted.` });
        } catch (error) {
            return errorHandler(error, req, res);
        }
    }
}

export default new CustomerController(customerService)