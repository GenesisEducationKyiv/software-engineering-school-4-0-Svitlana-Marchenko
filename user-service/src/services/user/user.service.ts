import {SubscriptionTypeEnum, User} from '../../entity/user.entity'
import UserAlreadyExistError from '../../error/types/userAlreadyExist.error'
import {IUserService} from "./user.service.interface";
import {IUserRepository} from "../../repositories/user/user.repository.interface";
import userRepository from "../../repositories/user/user.repository";
import UserNotFoundError from "../../error/types/userNotFound.error";
import {IEvent, IQueueService} from "../queue/queue.service.interface";
import {v4 as uuid} from 'uuid'
import rabbitService from "../queue/rabbit.service";

export class UserService implements IUserService{

    constructor(private userRepository: IUserRepository, private queueService: IQueueService) {}

    async subscribeEmail(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email)

        if (user) {
            throw new UserAlreadyExistError({message: `User with email ${email} has been added before`, logging: true});
        }
      
        try {
            const userData: IEvent = {
                aggregateId: uuid(),
                eventType: 'EmailChanged',
                timestamp: new Date().toString(),
                data: JSON.stringify(email)
            };
            await this.queueService.emitEvent(userData, "emailSubscribe")
            return await this.userRepository.saveByEmail(email)
        } catch (error) {
            throw new Error('Error creating user: ' + (error as Error).message)
        }
    }

    async resubscribeEmail(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email)

        if (!user) {
            throw new UserNotFoundError({message: `User with email ${email} has not been found`, logging: true});
        }

        try {
            user.subscriptionType = SubscriptionTypeEnum.Active

            const userData: IEvent = {
                aggregateId: uuid(),
                eventType: 'EmailChanged',
                timestamp: new Date().toString(),
                data: JSON.stringify(email)
            };
            await this.queueService.emitEvent(userData, "emailSubscribe")

            return await this.userRepository.saveByUser(user)
        } catch (error) {
            throw new Error('Error resubscribing user: ' + (error as Error).message)
        }
    }

    async unsubscribeEmail(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email)

        if (!user) {
            throw new UserNotFoundError({message: `User with email ${email} has not been found`, logging: true});
        }

        try {
            user.subscriptionType = SubscriptionTypeEnum.Cancelled
            const userData: IEvent = {
                aggregateId: uuid(),
                eventType: 'EmailChanged',
                timestamp: new Date().toString(),
                data: JSON.stringify(email)
            };
            await this.queueService.emitEvent(userData, "emailUnsubscribe")
            return await this.userRepository.saveByUser(user)
        } catch (error) {
            throw new Error('Error unsubscribing user: ' + (error as Error).message)
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
export default new UserService(userRepository, rabbitService)