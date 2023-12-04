import BaseRepository from './base.repository.js';
import ActionLog from '../models/action-log.model.js';

class ActionLogRepository extends BaseRepository {
  constructor() {
    super(ActionLog);
  }
}

export default ActionLogRepository;
