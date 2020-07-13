import { Request, Response } from 'express'

class ProductController {
    static listAll = async(req: Request, res: Response) => {
        try {
            return res.json({message: "autorizado"})
        } catch (error) {
            return res.status(401).send()   
        }
    }
}

export default ProductController