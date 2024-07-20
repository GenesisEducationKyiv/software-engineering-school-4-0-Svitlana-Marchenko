import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum EventTypeEnum {
    PreparedEmail = 'PreparedEmail',
    SentEmail = 'SentEmail'
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "enum",
        enum: EventTypeEnum,
        default: EventTypeEnum.PreparedEmail
    })
    eventType: EventTypeEnum;

    @Column()
    aggregateId: string;

    @Column()
    timestamp: Date;

    @Column()
    data: string;
}