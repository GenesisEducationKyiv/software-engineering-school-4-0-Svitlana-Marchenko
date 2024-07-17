export interface IUserService {
    addUser(email: string);
    rollbackUser(email: string);
}

export enum SubscriptionTypeEnum {
    Cancelled = 'Cancelled',
    Active = 'Active'
}

export class User {
    id: string;
    email: string;
    subscriptionType: SubscriptionTypeEnum;
}