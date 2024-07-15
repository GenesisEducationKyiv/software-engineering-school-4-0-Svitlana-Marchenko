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
            logger.error(`Error getting users: ${error.message}`);
            return errorHandler(error, req, res);
        }
    }

}

export default new CustomerController(customerService)