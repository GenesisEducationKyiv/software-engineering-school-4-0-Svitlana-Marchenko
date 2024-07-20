import {IUserService, User} from "./user.service.interface";
import axios from "axios";
import {USER_API_URL} from "../../config/system.config";

export class UserService implements IUserService {

    async addUser(email: string){
        try {
            await axios.post<User>(USER_API_URL, { email });
        } catch (error) {
            throw error;
        }
    }

    async rollbackUser(email: string) {
        try {
            await axios.delete(USER_API_URL, { data: { email } });
        } catch (error) {
            throw error;
        }
    }

}

export default new UserService()