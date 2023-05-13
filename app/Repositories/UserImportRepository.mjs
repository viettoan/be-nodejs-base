import BaseRepository from "./BaseRepository.mjs";
import UserImport from "../Models/UserImport.mjs";

class UserImportRepository extends BaseRepository
{
    constructor() {
        super(UserImport);
    }
}

export default new UserImportRepository();