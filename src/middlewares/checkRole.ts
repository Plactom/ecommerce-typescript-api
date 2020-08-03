import { Request, Response, NextFunction } from 'express'
import UserRepository from '../repository/UserRepository'
import { User } from '../entity/User'

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.jwtPayload.userId

        const userRepository = new UserRepository

        let user: User
        try {
            user = await userRepository.findOneUserById(userId)

            if(roles.indexOf(user.role) > -1) next()
            else res.status(401).json({message: 'role unauthorized'})

        } catch (error) {
            res.status(401).send()
        }
    }
}

