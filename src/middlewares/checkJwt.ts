import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["x-access-token"];
    let jwtPayload;

    try {
        jwtPayload = await <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;

    } catch (error) {
        return res.status(401).json({message: "jwt not found"})
    }

    const { userId, firstName, lastName, email, commerce } = jwtPayload
    const newToken = jwt.sign({userId, email, firstName, lastName, commerce}, config.jwtSecret, {
        expiresIn: '1h'
    });

    res.setHeader("x-access-token", newToken);

    next();
}

