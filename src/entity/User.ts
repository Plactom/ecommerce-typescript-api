import {Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Length, IsNotEmpty, IsEmail, IsLowercase } from 'class-validator'
import * as  bcrypt from 'bcryptjs'

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    commerceName: string

    @Column()
    @IsEmail()
    @IsLowercase()
    email: string;

    @Column()
    @Length(4, 100)
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