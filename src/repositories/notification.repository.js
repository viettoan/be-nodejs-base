import BaseRepository from './base.repository.js';
import Notification from '../models/notification.model.js';

/**
* @class NotificationRepository
*/
class NotificationRepository extends BaseRepository {
  /**
  * constructor function~
  * @model Notification
  */
  constructor() {
    super(Notification);
  }
}

export default NotificationRepository;
