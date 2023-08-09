import BaseController from "../BaseController.js";
import RoomService from "../../../Services/RoomService.js";
import {responseErrors, responseJsonByStatus, responseSuccess} from "../../../Common/helper.js";
import {ROOMS} from "../../../../config/constant.js";

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
}

export default RoomController;