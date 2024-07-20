import { Customer } from '../entities/customer.entity';
import {CustomerDTO} from "../dto/customer.dto";

export class CustomerMapper {
    static toDTO(customer: Customer): CustomerDTO {
        const customerDTO = new CustomerDTO();
        customerDTO.id = customer.id;
        customerDTO.email = customer.email;
        return customerDTO;
    }

    static toEntity(customerDTO:CustomerDTO): Customer {
        const customer = new Customer();
        customer.id = customerDTO.id;
        customer.email = customerDTO.email;
        return customer;
    }
}
