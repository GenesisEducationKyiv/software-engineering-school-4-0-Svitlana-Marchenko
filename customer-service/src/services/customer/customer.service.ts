import {ICustomerService} from "./customer.service.interface";
import {ICustomerRepository} from "../../repositories/customer/customer.repository.interface";
import {Customer} from "../../entities/customer.entity";
import customerRepository from "../../repositories/customer/customer.repository";

export class CustomerService implements ICustomerService{

    constructor(private userRepository: ICustomerRepository) {}

    async getAllUsers(): Promise<Customer[]> {
        try {
            return await this.userRepository.getAll()
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }
}
export default new CustomerService(customerRepository)