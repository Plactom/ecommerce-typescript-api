import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { Commerce } from './Commerce'


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column()
    productName: string

    @Column()
    productDescription: string

    @IsNotEmpty()
    @Column()
    price: number

    @ManyToOne(type => Commerce, commerce => commerce.products)
    commerce: Commerce
}