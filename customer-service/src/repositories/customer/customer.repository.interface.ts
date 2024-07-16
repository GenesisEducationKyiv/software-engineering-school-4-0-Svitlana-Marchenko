import {Customer} from "../../entities/customer.entity";

export interface ICustomerRepository{

    getAll(): Promise<Customer[]>

    getByEmail(email: string): Promise<Customer>

    saveByEmail(email: string): Promise<Customer>

}