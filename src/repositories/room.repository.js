import BaseRepository from './base.repository.js';
import Room from "../models/room.model.js";

class RoomRepository extends BaseRepository {
  constructor() {
    super(Room);
  }
}

export default RoomRepository;
