import { getManager, UpdateResult } from 'typeorm'
import { getConnection } from 'typeorm'
import { Product } from '../entity/Product'

export default class ProductRepository {
    listAllProducts(): Promise<Product[]> {
        return getManager()
        .getRepository(Product)
        .find()
    }

    findOneProduct(productId: number): Promise<Product> {
        return getManager().getRepository(Product).findOneOrFail({
            where: {
                id: productId
            }
        });
    }

    createProduct(product: Product): Promise<Product> {
        return getManager().getRepository(Product).save(product)
    }

    async updateProduct(product: Product): Promise<Object> {
        const update = await getConnection()
        .createQueryBuilder()
        .update(Product)
        .set({
            productName: product.productName,
            productDescription: product.productDescription,
            price: product.price,
        })
        .where("id = :id", { id: 1 })
        .execute()

        return update
    }
}