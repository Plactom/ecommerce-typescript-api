import { getManager } from "typeorm";
import { User } from '../entity/User'

export default class AuthRepository {

    listAllUsers(): Promise<User[]> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('User')
            .select('User.email')
            .getMany();
    }

    findOneUser(userEmail: string): Promise<User | undefined> {
        return getManager().getRepository(User).findOne({
            where: {
                email: userEmail
            }
        });
    }

    createUser(user: User): Promise<User> {
        return getManager().getRepository(User).save(user)
    }
}