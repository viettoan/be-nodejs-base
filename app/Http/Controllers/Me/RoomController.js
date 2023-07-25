import BaseController from "../BaseController.js";
import RoomService from "../../../Services/Me/RoomService.js";
import {responseErrors, responseJsonByStatus, responseSuccess} from "../../../Common/helper.js";

class RoomController extends BaseController
{
  static roomService = new RoomService();

  index(req, res)
  {
    const user = res.locals.authUser;

    return RoomController.roomService.index(user._id)
        .then(
            userRooms => responseJsonByStatus(res, responseSuccess(userRooms))
        )
        .catch(
            e => {
              return responseJsonByStatus(res, responseErrors(500, e.message), 500);
            }
        );
  }
}

export default RoomController;