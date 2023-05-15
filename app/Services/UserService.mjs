import {generateConfirmUrl, hashHmacString} from "../Common/helper.mjs";
import {DEFAULT_PASWORD} from "../../config/common.mjs";
import UserRepository from "../Repositories/UserRepository.mjs";
import EmailService from "./EmailService.mjs";

class UserService {
    async storeUser(data) {
        const result = {
            isSuccess: true,
        };

        try {
            data.password = hashHmacString(DEFAULT_PASWORD);
            const insertedUser = await UserRepository.store(data);
            EmailService.sendMail(
                [data.email],
                'Confirm Account Base Admin',
                'email/confirmAccount.ejs',
                {
                    name: data.name,
                    confirmUrl: generateConfirmUrl(insertedUser.id)
                }
            );
            result.user = insertedUser;
        } catch (e) {
            result.isSuccess = false;
            result.error = e;
        }

        return result;
    }
}

export default new UserService();