import BaseRepository from './BaseRepository.js';
import ActionLog from '../Models/ActionLog.js';

class ActionLogRepository extends BaseRepository {
  constructor() {
    super(ActionLog);
  }
}

export default new ActionLogRepository();
