import {ICustomerRepository} from "./customer.repository.interface";
import {Repository} from "typeorm/repository/Repository";
import {dataSource} from "../../config/dataSource";
import {Customer} from "../../entities/customer.entity";
import {v4 as uuidv4} from "uuid";

export class CustomerRepository implements ICustomerRepository {
    constructor(private repository: Repository<Customer>) {}

    getAll(): Promise<Customer[]> {
        return this.repository.find()
    }

    async getByEmail(email: string): Promise<Customer> {
        return await this.repository.findOne({ where: { email } })
    }

    private create(email: string): Customer {
        return this.repository.create({ id: uuidv4(), email: email })
    }

    async saveByEmail(email: string): Promise<Customer> {
        return await this.repository.save(this.create(email))
    }

}

export default new CustomerRepository(dataSource.getRepository(Customer))