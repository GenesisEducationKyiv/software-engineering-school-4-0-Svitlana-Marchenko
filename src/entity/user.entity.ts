import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryColumn({ type: 'text' })
    id: string

    @Column()
    email: string
}
