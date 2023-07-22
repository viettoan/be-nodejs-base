import RoomRepository from "../../Repositories/RoomRepository.js";

class RoomService
{
  constructor() {
    this.roomRepository = new RoomRepository();
  }

  getMyRoom(userId)
  {
    return this.roomRepository.findBy({
    })
  }
}