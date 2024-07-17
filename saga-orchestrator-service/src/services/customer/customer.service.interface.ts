export interface ICustomerService {
    addCustomer(email: string);
    rollbackCustomer(email: string);
}

export class Customer {
    id: string;
    email: string;
}