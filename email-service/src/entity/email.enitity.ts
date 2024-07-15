import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Email {
    @PrimaryColumn({ type: 'text' })
    id: string

    @Column()
    email: string

}