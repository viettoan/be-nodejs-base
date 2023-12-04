import BaseRepository from './base.repository.js';
import NotificationTemplate from '../models/notification-template.js';

/**
 * @class NotificationTemplateRepository
 */
class NotificationTemplateRepository extends BaseRepository {
  /**
   * constructor function
   * @model NotificationTemplate
   */
  constructor() {
    super(NotificationTemplate);
  }
}

export default NotificationTemplateRepository;
