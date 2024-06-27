import { User } from '../../entity/user.entity'
import { v4 as uuidv4 } from 'uuid'
import { dataSource as dataSource } from '../../dataSource'
import UserAlreadyExistError from '../../error/types/userAlreadyExist.error'
import {IUserService} from "./user.service.interface";
import {Repository} from "typeorm";


export class UserService implements IUserService{

    constructor(private repository: Repository<User>) {
    }

    async subscribeEmail(email: string): Promise<User> {

        const user = await this.repository.findOne({ where: { email } })
        if (user) {
            throw new UserAlreadyExistError({message: `User with email ${email} has been added before`, logging: true});
        }

        const newUser = this.repository.create({ id: uuidv4(), email })
        try {
            await this.repository.save(newUser)
            return newUser
        } catch (error) {
            throw new Error('Error creating user: ' + (error as Error).message)
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.repository.find()
        } catch (error) {
            throw new Error('Error getting all users email: ' + (error as Error).message)
        }
    }
}
export default new UserService(dataSource.getRepository(User))