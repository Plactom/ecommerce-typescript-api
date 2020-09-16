import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { Commerce } from './Commerce'

export interface IProduct {
    [key: string]: any;
    id: number;
    productName: string;
    productDescription: string;
    amount: number;
    price: number;
    commerce: Commerce;
}
@Entity()
export class Product{
    
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    productName: string

    @Column()
    productDescription: string

    @IsNotEmpty()
    @Column("float")
    price: number

    @IsNotEmpty()
    @Column({default: 1})
    amount: number

    @ManyToOne(type => Commerce, commerce => commerce.products)
    commerce: Commerce

}
