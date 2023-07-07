import BaseRepository from './BaseRepository.js';
import AdminNotification from '../Models/AdminNotification.js';

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
