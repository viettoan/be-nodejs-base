import Bull from "bull";
import {JOB_QUEUES, USER_IMPORTS, USERS} from "../../config/constant.js";
import UserImportRepository from "../Repositories/UserImportRepository.js";
import UserService from "../Services/UserService.js";
import winston from "winston";

class ImportUsers {
  constructor() {
    this.userImportRepository = new UserImportRepository();
    this.userService = new UserService();
  }
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
        await this.userImportRepository.update(userImport._id, {
          status: USER_IMPORTS.status.processing
        })

        for (const user of users) {
          const originUser = {...user};
          user.level = USERS.level.user;
          const storeUserResponse = await this.userService.storeUser(user);

          if (!storeUserResponse.isSuccess) {
            errors.push({
              user:originUser,
              error: storeUserResponse.error.message
            });
          }
        }
        await this.userImportRepository.update(userImport._id, {
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

export default ImportUsers;