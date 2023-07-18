import NotificationRepository from "../Repositories/NotificationRepository.js";
import NotificationTemplateRepository from "../Repositories/NotificationTemplateRepository.js";
import {NOTIFICATION_TEMPLATES, NOTIFICATIONS} from "../../config/constant.js";

class NotifyService
{
  constructor()
  {
    this.notificationTemplateRepository = new NotificationTemplateRepository();
  }

  async generateNotifyContent(params) {
    const {
      type,
      adminName,
      userName
    } = params;
    const notificationTemplate = await this.notificationTemplateRepository.findOne({
      type,
      status: NOTIFICATION_TEMPLATES.status.active
    });
    const mapObject = {
      [NOTIFICATION_TEMPLATES.tags.adminName]: adminName || '',
      [NOTIFICATION_TEMPLATES.tags.userName]: userName || ''
    }
    const regex = new RegExp(Object.keys(mapObject).join("|"), 'gi');

    return notificationTemplate.content.replace(
      regex,
      matched =>  mapObject[matched]
    );
  }
}

export default NotifyService;