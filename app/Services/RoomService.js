import RoomRepository from "../Repositories/RoomRepository.js";
import UserRoomRepository from "../Repositories/UserRoomRepository.js";
import UserRoom from "../Models/UserRoom.js";
import {responseErrors, responseSuccess} from "../Common/helper.js";
import {ROOMS} from "../../config/constant.js";

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
    return await this.userRoomRepository.findBy({
        user_id: userId
      })
      .populate('room');
  }

  async createNewRoom(users)
  {
    const room = await this.roomRepository.store({
      type: users.length > 2 ? ROOMS.type.group : ROOMS.type.oneToOne
    })
    const userRoomData = users.map(
      user => ({
        user_id: user.id,
        room_id: room._id,
        role: user.role
      })
    )
    const userRooms = await this.userRoomRepository.store(userRoomData);

    return true;
  }

  async show(roomId)
  {
    return await this.roomRepository.findById(roomId)
      .populate([
        'messages',
        {
          path: 'userRooms',
          populate: {
            path: 'user',
            select: ['_id', 'name', 'avatar']
          },
        }
      ]);
  }
}

export default RoomService;