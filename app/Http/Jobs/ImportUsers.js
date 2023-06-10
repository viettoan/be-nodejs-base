import Bull from "bull";
import {JOB_QUEUES, USER_IMPORTS, USERS} from "../../../config/common.js";
import UserImportRepository from "../../Repositories/UserImportRepository.js";
import UserService from "../../Services/UserService.js";
import winston from "winston";

class ImportUsers {
    async handle(users, userImport) {
        try {
            const userImportQueue = new Bull(JOB_QUEUES.userImports,  {
                redis: { host: "127.0.0.1", port: 6379 }
            });
            await userImportQueue.add({
                users,
                userImport
            });
            userImportQueue.process(async (job, done) => {
                const users = job.data.users;
                const userImport = job.data.userImport;
                let errors = [];
                const updateProcessingUserImport = await UserImportRepository.update(userImport._id, {
                    status: USER_IMPORTS.status.processing
                })

                for (const user of users) {
                    const originUser = {...user};
                    user.level = USERS.level.user;
                    const storeUserResponse = await UserService.storeUser(user);

                    if (!storeUserResponse.isSuccess) {
                        errors.push({
                            user:originUser,
                            error: storeUserResponse.error.message
                        });
                    }
                }
                const updateDoneUserImport = await UserImportRepository.update(userImport._id, {
                    status: USER_IMPORTS.status.done,
                    has_errors: errors.length ? USER_IMPORTS.has_errors.true : USER_IMPORTS.has_errors.false,
                    log: errors.length ? JSON.stringify({errors}) : ''
                })
                done();
            });
            winston.loggers.get('user_imports').info('Import Success')
        } catch (e) {
            winston.loggers.get('user_imports').error('Import Error', e)
        }

    }
}

export default new ImportUsers();