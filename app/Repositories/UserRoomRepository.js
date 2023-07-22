import BaseRepository from './BaseRepository.js';
import UserRoom from "../Models/UserRoom.js";

class UserRoomRepository extends BaseRepository {
  constructor() {
    super(UserRoom);
  }
}

export default UserRoomRepository;
