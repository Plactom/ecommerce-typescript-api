import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Product } from './Product'
import { User } from './User'

@Entity()
export class Commerce {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    commerceName: string

    @OneToMany(type => Product, product => product.commerce)
    products: Product[]

    @OneToMany(type => User, user => user.commerce)
    users: User[]
}