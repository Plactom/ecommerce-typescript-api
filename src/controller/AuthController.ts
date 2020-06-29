import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository'

class AuthController {
    static signIn = async(req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            let userRepository = new UserRepository()
    
            if(!(email && password)) {
                res.status(400).send();
            }

            const verifyIfExists = userRepository.ifUserExists(email)
            return res.json(verifyIfExists)

        } catch (error) {

            console.log(error)
        }
    }

    static signUp = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default AuthController