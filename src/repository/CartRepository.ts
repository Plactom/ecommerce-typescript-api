import { getConnection, getManager } from "typeorm";
import { Cart } from "../entity/Cart";
import { User } from "../entity/User";

export default class CartRepository {
    getCart(userId: Number) {
        return getConnection()
        .createQueryBuilder()
        .select("cart")
        .from(User, "user")
        .where("user.id = id", {id: userId})
        .getOne()
    }

    createCart(cart: Cart): Promise<Cart>{
        return getManager().getRepository(Cart).save(cart);
    }
   
}