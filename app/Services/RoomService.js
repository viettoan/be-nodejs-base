import RoomRepository from "../Repositories/RoomRepository.js";
import UserRoomRepository from "../Repositories/UserRoomRepository.js";
import UserRoom from "../Models/UserRoom.js";
import {getUrlAvatar, getUrlAvatarRoom, responseErrors, responseSuccess} from "../Common/helper.js";
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
    const userRooms = await this.userRoomRepository.findBy({
        user_id: userId
      })
      .populate([
        {
          path: 'room',
          populate: {
            path: 'userRooms',
            match: {
              user_id: {
                $ne: userId
              }
            },
            populate: 'user'
          }
        }
      ]);

    return userRooms.map(
      userRoom => {
        const room = this.handleRoom(userId, userRoom.room[0]);

        return {
          _id: room._id,
          type: room.type,
          name: room.name,
          avatar: room.avatar,
          created_at: room.created_at,
          updated_at: room.updated_at,
        }
      }
    );
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
        {
          path: 'messages',
          populate: {
            path: 'sender',
            select: ['_id', 'name', 'avatar']
          }
        },
        {
          path: 'userRooms',
          populate: {
            path: 'user',
            select: ['_id', 'name', 'avatar']
          },
        }
      ]);
  }

  handleRoom(userId, room)
  {
    const userRooms = room.userRooms;

    if (room.type === ROOMS.type.oneToOne && (!room.name || room.avatar)) {
      const userRoomExceptUserId = userRooms.find(
        userRoom => userRoom.user_id !== userId
      )
      const user = userRoomExceptUserId.user[0];

      if (!room.name) {
        room.name = user.name ?? '';
      }

      if (!room.avatar) {
        room.avatar = user.avatar;
      }

      return room;
    }

    if (!room.name) {
      let roomName = '';

      for (const userRoom of userRooms) {
        const user = userRoom.user[0];

        if (user) {
          roomName += ', ' + user.name;
        }
      }
      room.name = roomName
    }

    return room;
  }
}

export default RoomService;