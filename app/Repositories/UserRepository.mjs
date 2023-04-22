import BaseRepository from "./BaseRepository.mjs";
import User from "../Models/User.mjs";

class UserRepository extends BaseRepository
{
    constructor() {
        super(User);
    }

}

export default new UserRepository();