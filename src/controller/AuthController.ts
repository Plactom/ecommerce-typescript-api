import { Request, Response } from "express";
import AuthRepository from '../repository/AuthRepository'

class AuthController {
    private repository: AuthRepository
    constructor() {
        this.repository = new AuthRepository();
    }
    static login = async(req: Request, res: Response) => {
        const { username, password } = req.body

        if(!(username && password)) {
            res.status(400).send();
        }

        try {
            const verifyIfExists = this
        } catch (error) {
            console.log(error)
        }
    }
}

export default AuthController