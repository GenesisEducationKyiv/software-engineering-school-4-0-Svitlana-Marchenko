import { Entity, Column, PrimaryColumn } from 'typeorm'

export enum SubscriptionTypeEnum {
    Cancelled = 'Cancelled',
    Active = 'Active'
}
@Entity()
export class User {
    @PrimaryColumn({ type: 'text' })
    id: string

    @Column()
    email: string

    @Column({
        type: "enum",
        enum: SubscriptionTypeEnum,
        default: SubscriptionTypeEnum.Active
    })
    subscriptionType: SubscriptionTypeEnum;
}

