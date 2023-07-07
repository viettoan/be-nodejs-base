import BaseRepository from './BaseRepository.js';
import Notification from '../Models/Notification.js';

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
