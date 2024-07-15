import {Customer} from "../../entities/customer.entity";

export interface ICustomerRepository{
    getAll(): Promise<Customer[]>
}