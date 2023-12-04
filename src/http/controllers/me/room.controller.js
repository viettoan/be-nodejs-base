import BaseController from "../base.controller.js";
import RoomService from "../../../services/room.service.js";
import {responseErrors, responseJsonByStatus, responseSuccess} from "../../../common/helper.js";

class RoomController extends BaseController
{
  static roomService = new RoomService();

  async index(req, res)
  {
    try {
      const user = res.locals.authUser;
      const userRooms = await RoomController.roomService.index(user._id);

      return responseJsonByStatus(res, responseSuccess(userRooms));
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }

  async createNewRoom(req, res)
  {
    try {
      const {users} = req.body;

      return responseJsonByStatus(
        res,
        responseSuccess(await RoomController.roomService.createNewRoom(users))
      );
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }

  async show(req, res)
  {
    try {
      const {roomId} = req.params;
      const room = await RoomController.roomService.show(roomId);

      return responseJsonByStatus(
        res,
        responseSuccess(room)
      );
    } catch (e) {
      return responseJsonByStatus(res, responseErrors(500, e.message), 500);
    }
  }
}

export default RoomController;