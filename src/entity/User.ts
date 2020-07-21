import {Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Length, IsNotEmpty, IsEmail, IsLowercase } from 'class-validator'
import { Commerce } from './Commerce'
import * as  bcrypt from 'bcryptjs'

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

    @ManyToOne(type => Commerce, commerce => commerce.users)
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
    role: string

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