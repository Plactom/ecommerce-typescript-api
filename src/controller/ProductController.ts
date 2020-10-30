import { Request, Response } from 'express'
import ProductRepository from '../repository/ProductRepository'
import { Product, IProduct } from '../entity/Product'
import { validate } from 'class-validator'

class ProductController {
    static newProduct = async(req: Request, res: Response) => {
        const commerceId = res.locals.jwtPayload.commerce.id;
        const { productName, productDescription, productPrice, amount } = req.body;
        const productRepository = new ProductRepository();

        let product = new Product();
        product.productName = productName;
        product.productDescription = productDescription;
        product.price = productPrice || 0.00;
        product.amount = amount || 1
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
        const { productName, productDescription, productPrice, amount } = req.body
        const productId = req.params.productId
        const productRepository = new ProductRepository();

        let product: IProduct = new Product();
        product.productName = productName || null;
        product.productDescription = productDescription || null;
        product.price = productPrice || null;
        product.amount = amount || null
        
        let result: Object

        try {
            const previousProduct = await productRepository.findOneProduct(productId)
            
            if(previousProduct) {
                for(let props in product) {
                    if(product[props] === null) delete product[props]
                }

                product = {...previousProduct, ...product}
                result = await productRepository.updateProduct(product, productId)
                
                return res.status(200).send(result)
            } else {
                return res.status(404).send('Product not found')
            }
        } catch (error) {
            return res.status(409)
        }
    }
}

export default ProductController