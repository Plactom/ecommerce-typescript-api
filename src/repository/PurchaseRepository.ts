import { Brackets, getConnection } from "typeorm";
import { Cart } from "../entity/Cart";
import { User } from "../entity/User";

export default class PurchaseRepository {
    addToCart(cart: Cart, userId: number): Promise<Object> {

        const subquery = getConnection()
        .createQueryBuilder()
        .select('*')
        .from(User, 'user')
        .where('user.id = :userId', {userId: userId})
        
        

        const update = getConnection()
        .createQueryBuilder()
        .update(Cart)
        .set({
            products: cart.products,
            totalValue: cart.totalValue
        })
        .where('('+subquery.getQuery()+')')
        .execute()

        return update
    }
}