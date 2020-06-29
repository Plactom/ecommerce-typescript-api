import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository'

class AuthController {
    static signIn = async(req: Request, res: Response) => {
        try {
            const { username, password } = req.body
            let userRepository = new UserRepository()
    
            if(!(username && password)) {
                res.status(400).send();
            }

            const verifyIfExists = userRepository.ifUserExists(username)
            return res.json(verifyIfExists)

        } catch (error) {

            console.log(error)
        }
    }


}

export default AuthController