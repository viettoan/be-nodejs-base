import MessageService from "../../../services/message.service.js";
import {responseErrors, responseJsonByStatus, responseSuccess} from "../../../common/helper.js";

class MessageController {
  static messageService = new MessageService();
  async store (req, res) {
    try {
      const data = req.body;
      data.sender_id = res.locals.authUser._id;

      return responseJsonByStatus(
        res,
        responseSuccess(
          await MessageController.messageService.store(data)
        )
      );
    } catch (e) {
      return responseJsonByStatus(
        res,
        responseErrors(500, e),
        500
      )
    }
  }
}

export default MessageController;