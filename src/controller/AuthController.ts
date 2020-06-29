import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository'
import { User } from "../entity/User"
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

class AuthController {
    static signIn = async(req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            let userRepository = new UserRepository()
            let user = new User()
    
            if(!(email && password)) {
                res.status(400).send();
            }

            user = await userRepository.findOneUser(email)
            
            if(!user.checkIfUnencryptedPasswordIsValid(password)) {
                return res.status(401).send()
            }

            const token = jwt.sign(
                {email: user.email, username: `${user.firstName} ${user.lastName}`},
                config.jwtSecret,
                {expiresIn: '1h'}
            )

            return res.json({token: token})

        } catch (error) {
            return res.status(401).send()
        }
    }

    static signUp = async(req: Request, res: Response) => {
        try {
            const { email, password, firstName, lastName } = req.body
            let userRepository = new UserRepository()
            let user = new User()
            user.email = email
            user.firstName = firstName
            user.lastName = lastName

            const verifyIfExists  = await userRepository.findOneUser(email)

            const createUser = await userRepository.createUser(user)

            return res.json(createUser)
            
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthController