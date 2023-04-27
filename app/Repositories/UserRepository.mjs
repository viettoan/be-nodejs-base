import BaseRepository from "./BaseRepository.mjs";
import User from "../Models/User.mjs";

class UserRepository extends BaseRepository
{
    constructor() {
        super(User);
    }

    async findByPhone(phone) {
        return await this.getModel().findOne({
            phone,
            deleted_at: null
        })
    }
}

export default new UserRepository();