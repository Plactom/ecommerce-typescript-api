import { getManager } from 'typeorm'
import { Product } from '../entity/Product'

export default class ProductRepository {
    createProduct(product: Product): Promise<Product> {
        return getManager().getRepository(Product).save(product)
    }
}