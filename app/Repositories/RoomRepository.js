import BaseRepository from './BaseRepository.js';
import Room from "../Models/Room.js";

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

export default RoomRepository;
