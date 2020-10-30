import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column("int", {
        nullable: true,
        array: true
    })
    products: number[];

    @Column()
    totalValue: number;
}