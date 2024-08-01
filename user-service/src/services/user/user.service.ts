import { User } from '../../entity/user.entity'
import {IUserService} from "./user.service.interface";
import {IUserRepository} from "../../repositories/user.repository.interface";
import UserAlreadyExistError from "../../error/types/userAlreadyExist.error";
import userRepository from "../../repositories/user.repository";

export class UserService implements IUserService {
   constructor(private userRepository: IUserRepository) {}

   async subscribeEmail(email: string): Promise<User> {
      const user = await this.userRepository.getByEmail(email)

      if (user) {
         throw new UserAlreadyExistError({
            message: `User with email ${email} has been added before`,
            logging: true,
         })
      }

      try {
         return await this.userRepository.saveByEmail(email)
      } catch (error) {
         throw new Error('Error creating user: ' + (error as Error).message)
      }
   }

   async getAllUsers(): Promise<User[]> {
      try {
         return await this.userRepository.getAll()
      } catch (error) {
         throw new Error(
            'Error getting all users email: ' + (error as Error).message,
         )
      }
   }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.getAll()
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }

    async getAllUsersEmails(): Promise<string[]> {
        try {
            const users = await this.userRepository.getAll()
            return users.map(user => user.email);
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }
}
export default new UserService(userRepository)
