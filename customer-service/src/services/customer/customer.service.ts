import {ICustomerService} from "./customer.service.interface";
import {ICustomerRepository} from "../../repositories/customer/customer.repository.interface";
import {Customer} from "../../entities/customer.entity";
import customerRepository from "../../repositories/customer/customer.repository";
import CustomerAlreadyExistError from "../../errors/types/customerAlreadyExist.error";

export class CustomerService implements ICustomerService {

    constructor(private customerRepository: ICustomerRepository) {}

    async getAllUsers(): Promise<Customer[]> {
        try {
            return await this.customerRepository.getAll()
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }

    async addCustomer(email: string): Promise<Customer> {
        const user = await this.customerRepository.getByEmail(email)
        if (user) {
            throw new CustomerAlreadyExistError({
                message: `Customer with email ${email} has been added before`,
                logging: true
            });
        }
        return await this.customerRepository.saveByEmail(email)
    }

    async deleteCustomerByEmail(email: string): Promise<void> {
        await this.customerRepository.deleteByEmail(email);
    }
}

export default new CustomerService(customerRepository)