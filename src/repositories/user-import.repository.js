import BaseRepository from './base.repository.js';
import UserImport from '../models/user-import.model.js';

class UserImportRepository extends BaseRepository {
  constructor() {
    super(UserImport);
  }

  showNewest() {
    return this.getModel().findOne().sort(
      {
        created_at: -1,
      }
    );
  }
}

export default UserImportRepository;
