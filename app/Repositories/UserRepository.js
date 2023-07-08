import BaseRepository from "./BaseRepository.js";
import User from "../Models/User.js";
import {USERS} from "../../config/constant.js";

class UserRepository extends BaseRepository
{
  constructor() {
    super(User);
  }

  async findUserConfirmedAccountByPhone(phone) {
    return await this.getModel().findOne({
      phone,
      is_confirm_account: USERS.is_confirm_account.true,
      deleted_at: null
    })
  }
}

export default UserRepository;