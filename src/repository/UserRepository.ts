import { getManager } from "typeorm";
import { User } from '../entity/User'

export default class AuthRepository {

    async ifUserExists(email: String): Promise<User[]> {
        return await getManager()
            .getRepository(User)
            .createQueryBuilder('User')
            .select('User.id')
            .getMany();
    }
}