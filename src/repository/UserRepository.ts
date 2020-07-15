import { getManager } from "typeorm";
import { User } from '../entity/User'

export default class UserRepository {

    listAllUsers(): Promise<User[]> {
        return getManager()
            .getRepository(User)
            .find()
    }

    findOneUser(userEmail: string): Promise<User> {
        return getManager().getRepository(User).findOneOrFail({
            where: {
                email: userEmail
            }
        });
    }

    createUser(user: User): Promise<User> {
        return getManager().getRepository(User).save(user)
    }

    findOneUserById(userId: string): Promise<User> {
        return getManager().getRepository(User).findOneOrFail({
            where: {
                id: userId
            }
        })
    }
}