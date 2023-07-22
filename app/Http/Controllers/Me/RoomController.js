import BaseController from "../BaseController.js";

class RoomController extends BaseController
{
  getMyRooms(req, res)
  {
    const user = res.locals.authUser;
  }
}

export default RoomController;