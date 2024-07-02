import {IUserService} from "./user.service.interface";
import axios from "axios";

export class UserService implements IUserService{

    constructor() {}

    async getAllUsersEmail(): Promise<string[]> {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            const users = response.data;

            return users.map((user: { email: string }) => user.email);
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }
}
export default new UserService()