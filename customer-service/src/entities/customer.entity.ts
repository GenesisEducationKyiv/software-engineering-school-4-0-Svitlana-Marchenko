import { Entity, Column, PrimaryColumn } from 'typeorm'
@Entity()
export class Customer {
    @PrimaryColumn({ type: 'text' })
    id: string

    @Column()
    email: string

}

