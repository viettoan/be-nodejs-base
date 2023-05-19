import BaseRepository from "./BaseRepository.mjs";
import UserImport from "../Models/UserImport.mjs";

class UserImportRepository extends BaseRepository
{
    constructor() {
        super(UserImport);
    }

    showNewest() {
        return this.getModel().findOne().sort(
            {
                created_at: -1
            }
        )
    }
}

export default new UserImportRepository();