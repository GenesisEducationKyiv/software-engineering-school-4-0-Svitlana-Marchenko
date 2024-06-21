import { User } from '../../entity/user.entity'
import { v4 as uuidv4 } from 'uuid'
import { UserAlreadyExistsError } from '../../error/user.error'
import {IUserService} from "./user.service.interface";
import {IUserRepository} from "../../repositories/user.repository.interface";
import userRepository from "../../repositories/user.repository";

export class UserService implements IUserService{

    constructor(private userRepository: IUserRepository) {}

    async subscribeEmail(email: string): Promise<User> {
        const user = await this.userRepository.getUserByEmail(email)
        if (user) {
            throw new UserAlreadyExistsError(email)
        }
        const newUser = this.userRepository.createUser(uuidv4(), email)
        try {
            await this.userRepository.saveUser(newUser)
            return newUser
        } catch (error) {
            throw new Error('Error creating user: ' + (error as Error).message)
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.getAllUsers()
        } catch (error) {
            throw new Error(
                'Error getting all users email: ' + (error as Error).message
            )
        }
    }
}
export default new UserService(userRepository)