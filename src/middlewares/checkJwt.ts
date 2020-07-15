import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import config from '../config/config'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["x-access-token"];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;

    } catch (error) {
        return res.status(401).json({message: "jwt not found"})
    }

    const { firstName, lastName, email } = jwtPayload
    const newToken = jwt.sign({firstName, lastName, email}, config.jwtSecret, {
        expiresIn: '1h'
    });

    res.setHeader("x-access-token", newToken);

    next();
}

