import { getManager } from 'typeorm'
import { Commerce } from '../entity/Commerce'

export default class CommerceRepository {
    createCommerce(commerce: Commerce): Promise<Commerce> {
        return getManager().getRepository(Commerce).save(commerce)
    }
}