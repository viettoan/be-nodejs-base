import BaseController from "../BaseController.js";
import RoomService from "../../../Services/Me/RoomService.js";
import {responseErrors, responseJsonByStatus, responseSuccess} from "../../../Common/helper.js";

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
}

export default RoomController;