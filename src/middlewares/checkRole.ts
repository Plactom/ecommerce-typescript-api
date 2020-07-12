import { Request, Response, NextFunction } from 'express'
import { User } from '../entity/User'

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        
    }
}

