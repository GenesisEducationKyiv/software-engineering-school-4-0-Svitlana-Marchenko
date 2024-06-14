import { User } from '../../entity/user.entity'
import { v4 as uuidv4 } from 'uuid'
import { dataSource as dataSource } from '../../dataSource'
import { UserAlreadyExistsError } from '../../error/user.error'
import {IUserService} from "./user.service.interface";

class UserService implements IUserService{

    async subscribeEmail(email: string): Promise<User> {
        const userRepository = dataSource.getRepository(User)
        const user = await userRepository.findOne({ where: { email } })
        if (user) {
            throw new UserAlreadyExistsError(email)
        }
        const newUser = userRepository.create({ id: uuidv4(), email })
        try {
            await userRepository.save(newUser)
            return newUser
        } catch (error) {
            throw new Error('Error creating user: ' + (error as Error).message)
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            const userRepository = dataSource.getRepository(User)
            return await userRepository.find()
        } catch (error) {
            throw new Error(
                'Error getting all users email: ' + (error as Error).message
            )
        }
    }
}

export default new UserService()