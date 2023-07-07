import BaseRepository from './BaseRepository.js';
import NotificationTemplate from '../Models/NotificationTemplate.js';

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
