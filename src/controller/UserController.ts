import { Request, Response } from 'express'
import UserRepository from '../repository/UserRepository'
import { validate } from 'class-validator'

import { User } from '../entity/User'

class UserController {
    static newUser = async(req: Request, res: Response) => {
        let { firstName, lastName, commerceName, email, password, role } = req.body;
        let userRepository = new UserRepository()
        let user = new User;
        user.firstName = firstName;
        user.lastName = lastName;
        user.commerceName = commerceName;
        user.email = email;
        user.password = password;
        user.role = role;

        const errors = validate(user);
        if((await errors).length > 0) {
            return res.status(400).send(errors)
        }

        user.hashPassword()

        try {
            await userRepository.createUser(user)
        } catch (error) {
            return res.status(409).send('Username already in use')
        }

        return res.status(204).send()
    }
}

export default UserController