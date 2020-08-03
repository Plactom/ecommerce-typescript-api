import { Request, Response } from 'express'
import ProductRepository from '../repository/ProductRepository'
import { Product } from '../entity/Product'
class ProductController {
    static newProduct = async(req: Request, res: Response) => {
        const { productName, productDescription, productPrice } = req.body;
        const productRepository = new ProductRepository();
        const commerceId = res.locals.jwtPayload.commerce.id;

        let product = new Product();
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = productPrice || 0.00;
        product.commerce = commerceId;

        
        if(!(productName && productDescription))
            res.status(400).send()

        try {
            product = await productRepository.createProduct(product)

        } catch (error) {
            return res.status(409).send(error)   
        }

        return res.status(201).send()
    }
}

export default ProductController