import axios from "axios";
import {CUSTOMER_API_URL} from "../../config/system.config";
import {ICustomerService} from "./customer.service.interface";

export class CustomerService implements ICustomerService {

    async addCustomer(email: string) {
        try {
            // const response: AxiosResponse<Customer> = await axios.post<Customer>(CUSTOMER_API_URL, { email });
            await axios.post(CUSTOMER_API_URL, { email });
        } catch (error) {
            console.error('Error adding user:', error);
            throw error;
        }
    }

    async rollbackCustomer(email: string) {
        try {
            await axios.delete(CUSTOMER_API_URL, { data: { email } });
        } catch (error) {
            throw error;
        }
    }
}

export default new CustomerService()