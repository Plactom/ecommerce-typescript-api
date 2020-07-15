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
                {
                    userId: user.id,
                    email: user.email, 
                    firstName: user.firstName,
                    lastName: user.lastName, 
                    commerceName: user.commerceName
                },
                config.jwtSecret,
                {expiresIn: '1h'}
            )

            res.json({token: token})

        } catch (error) {
            return res.status(401).send()
        }
    }
}

export default AuthController