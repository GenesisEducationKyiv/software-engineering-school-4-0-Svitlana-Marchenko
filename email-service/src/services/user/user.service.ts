import {IUserService} from "./user.service.interface";
import axios from "axios";
import {errorMailHandler} from "../../../../src/error/handler/senderError.handler";
import {USER_API_URL} from "../../config/system.config";

export class UserService implements IUserService{

    constructor() {}

    async getAllUsersEmail(): Promise<string[]> {
        try {
            const response = await axios.get(USER_API_URL);
            const users = response.data;

            return users.map((user: { email: string }) => user.email);
        } catch (error) {
            errorMailHandler(error)
        }
    }
}
export default new UserService()