import BaseRepository from './BaseRepository.js';
import UserImport from '../Models/UserImport.js';

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

export default new UserImportRepository();
