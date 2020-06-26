import { getConnection } from "typeorm";
import { User } from '../entity/User'

export default class AuthRepository {

    async ifUserExists(email: String): Promise<User> {
        const searchUser = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.email = :email", {email})
            .getOne()
        
        return searchUser ? searchUser : new User;
    }
}