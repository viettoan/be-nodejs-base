import BaseRepository from './base.repository.js';
import UserRoom from "../models/user-room.model.js";

class UserRoomRepository extends BaseRepository {
  constructor() {
    super(UserRoom);
  }
}

export default UserRoomRepository;
