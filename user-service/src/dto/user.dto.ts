import {SubscriptionTypeEnum} from "../entity/user.entity";

export class UserDTO {
    id: string;

    email: string;

    subscriptionType: SubscriptionTypeEnum;

}