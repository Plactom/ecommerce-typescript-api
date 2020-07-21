import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Commerce } from './Commerce'


@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    productName: string

    @Column()
    productDescription: string

    @Column()
    price: number

    @ManyToOne(type => Commerce, commerce => commerce.products)
    commerce: Commerce
}