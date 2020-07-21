import { Request, Response } from 'express'
import UserRepository from '../repository/UserRepository'
import CommerceRepository from '../repository/CommerceRepository'
import { validate } from 'class-validator'
import { User } from '../entity/User'
import { Commerce } from '../entity/Commerce'

class UserController {
    static newUser = async(req: Request, res: Response) => {
        let { firstName, lastName, email, password, role, commerceName } = req.body;
        let userRepository = new UserRepository()
        let commerceRepository = new CommerceRepository()
        let user = new User;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.role = role;

        const errors = validate(user);

        if((await errors).length > 0) {
            console.log(errors)
            return res.status(400).send()
        }

        user.hashPassword()

        try {
            if(user.role == 'ADMIN') {
                let commerce = new Commerce()
                commerce.users = [user]
                commerce.commerceName = commerceName || 'Meu Comércio'
                await userRepository.createUser(user)
                await commerceRepository.createCommerce(commerce)
            }

            await userRepository.createUser(user)
        } catch (error) {
            return res.status(409).send(error)
        }

        return res.status(204).send()
    }
}

export default UserController