import { Request, Response } from 'express'
import ProductRepository from '../repository/ProductRepository'
import { Product } from '../entity/Product'
import { validate } from 'class-validator'
import { UpdateResult } from 'typeorm'
class ProductController {
    static newProduct = async(req: Request, res: Response) => {
        const commerceId = res.locals.jwtPayload.commerce.id;
        const { productName, productDescription, productPrice } = req.body;
        const productRepository = new ProductRepository();

        let product = new Product();
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = productPrice || 0.00;
        product.commerce = commerceId;

        const errors = await validate(product)
        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        try {
            product = await productRepository.createProduct(product)

        } catch (error) {
            return res.status(409).send(error)   
        }

        return res.status(201).send()
    }

    static updateProduct = async(req: Request, res: Response) => {
        const commerceId = res.locals.jwtPayload.commerce.id;
        const { productName, productDescription, productPrice } = req.body
        const productRepository = new ProductRepository();

        let product = new Product();
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = productPrice;

        const errors = await validate(product)

        if(errors.length > 0) {
            return res.status(400).send(errors)
        }

        let result: Object

        try {
            result = await productRepository.updateProduct(product)

        } catch (error) {
            return res.status(409)
        }
        
        return res.status(200).send(result)
    }
}

export default ProductController