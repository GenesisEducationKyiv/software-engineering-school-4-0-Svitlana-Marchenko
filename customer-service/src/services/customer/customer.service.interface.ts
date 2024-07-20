import {Customer} from "../../entities/customer.entity";


export interface ICustomerService {
    getAllUsers(): Promise<Customer[]>;
    addCustomer(email: string): Promise<Customer>;
    deleteCustomerByEmail(email: string): Promise<void>;
}