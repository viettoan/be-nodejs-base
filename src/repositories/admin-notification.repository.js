import BaseRepository from './base.repository.js';
import AdminNotification from '../models/admin-notification.model.js';

/**
 * @class AdminNotificationRepository
 */
class AdminNotificationRepository extends BaseRepository {
  /**
   * constructor function
   * @model AdminNotification
   */
  constructor() {
    super(AdminNotification);
  }
}

export default AdminNotificationRepository;
