import {Entity, JoinColumn, OneToOne, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Length, IsNotEmpty, IsEmail, IsLowercase } from 'class-validator'
import { Commerce } from './Commerce'
import * as  bcrypt from 'bcryptjs'
import { Cart } from "./Cart";

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsNotEmpty()
    lastName: string;

    @ManyToOne(type => Commerce, commerce => commerce.users, {
        eager: true,
        onDelete: 'CASCADE'
    })
    commerce: Commerce

    @Column()
    @IsEmail()
    @IsLowercase()
    email: string;

    @Column()
    @Length(4, 100)
    @IsNotEmpty()
    password: string

    @Column()
    @IsNotEmpty()
    role: string;

    @OneToOne(() => Cart)
    @JoinColumn()
    cart: Cart;


    @Column()
    @CreateDateColumn()
    createdAt: Date
    
    @Column()
    @UpdateDateColumn()
    updatedAt: Date

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password)
    }
}