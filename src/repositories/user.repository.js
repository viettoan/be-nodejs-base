import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";
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