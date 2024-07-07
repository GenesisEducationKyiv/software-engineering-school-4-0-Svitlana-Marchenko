import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Rate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 5, scale: 2 })
    rate: number;

    @Column('date')
    date: Date;
}