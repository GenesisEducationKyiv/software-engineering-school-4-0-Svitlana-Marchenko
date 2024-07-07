import {Entity, Column, PrimaryColumn} from 'typeorm'

@Entity()
export class Rate {
    @PrimaryColumn({ type: 'text' })
    id: string;

    @Column('decimal', { precision: 5, scale: 2 })
    rate: number;

    @Column("date")
    date: Date;
}