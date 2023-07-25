import RoomRepository from "../../Repositories/RoomRepository.js";
import UserRoomRepository from "../../Repositories/UserRoomRepository.js";
import UserRoom from "../../Models/UserRoom.js";
import {responseErrors, responseSuccess} from "../../Common/helper.js";

class RoomService
{
  constructor() {
    this.roomRepository = new RoomRepository();
    this.userRoomRepository = new UserRoomRepository();
  }

  /**
   * Get rooms of user
   * @param userId
   * @returns {*}
   */
  async index(userId)
  {
    return this.userRoomRepository.findBy({
      user_id: userId
    })
      .populate('room')
      .then(
        userRooms => Promise.resolve(userRooms)
      )
      .catch(
        e => {
          return Promise.reject(e)
        }
      );
  }
}

export default RoomService;