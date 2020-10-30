import { resolveSoa } from 'dns';
import { Request, Response } from 'express'
import PurchaseRepository from '../repository/PurchaseRepository';
import UserRepository from '../repository/UserRepository'

class PurchaseController {
    static addProductToCart = async(req: Request, res: Response) => {
        let { productId } = req.body;
        const userId = res.locals.jwtPayload.userId;
        const purchaseRepository = new PurchaseRepository();
        const userRepository = new UserRepository();

        let result: Object

        if(!userId) {
            return res.status(401).json({message: 'Você precisa estar logado para adicionar ao carrinho'})
        }

        try {
            let cart: Array<Number> = productId

            try {
                const previousCart = await userRepository.getCart(userId)

                if(previousCart) {
                    cart = {...previousCart, ...cart}
                    result = await purchaseRepository.addToCart(cart, userId)

                    return res.status(200).send(result)
                } else {
                    //caso o carrinho estiver vazio...
                }
            } catch (error) {
                
            }            
            
        } catch (error) {
            
        }

    }
}