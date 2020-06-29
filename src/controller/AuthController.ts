import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository'
import { User } from "../entity/User";
import { create } from "domain";

class AuthController {
    static signIn = async(req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            let userRepository = new UserRepository()
    
            if(!(email && password)) {
                res.status(400).send();
            }

            const verifyIfExists = await userRepository.findOneUser(email)
            return res.json(verifyIfExists)

        } catch (error) {

            console.log(error)
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