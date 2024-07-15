import {ICustomerRepository} from "./customer.repository.interface";
import {Repository} from "typeorm/repository/Repository";
import {dataSource} from "../../config/dataSource";
import {Customer} from "../../entities/customer.entity";

export class CustomerRepository implements ICustomerRepository {
    constructor(private repository: Repository<Customer>) {}

    getAll(): Promise<Customer[]> {
        return this.repository.find()
    }
}

export default new CustomerRepository(dataSource.getRepository(Customer))