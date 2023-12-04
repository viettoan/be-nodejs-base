import '../loadEnvironment.js';
import mongoDbConnect from "../database/mongodb.js";
import request from 'supertest';
import app from '../app.js';
import { faker } from '@faker-js/faker';
import {DEFAULT_PASWORD, USERS} from "../config/constant.js";
import {generateJWTToken, hashHmacString, randomElementArray} from "../src/common/helper.js";
import User from '../src/models/user.model.js';
const levels = [
   USERS.level.user,
   USERS.level.admin
]
const dataUser = {
   name: faker.internet.userName(),
   email: faker.internet.email(),
   phone: faker.helpers.fromRegExp(/[0-9]{10,11}/),
   level: randomElementArray(levels)
};
let token = '';

beforeAll(async () => {
   await mongoDbConnect;
   const user = await User.create({
      name: 'super_admin',
      email: 'superadmin@gmail.com',
      phone: '0981934614',
      level: USERS.level.super_admin,
      password: hashHmacString(DEFAULT_PASWORD),
      is_confirm_account: USERS.is_confirm_account.true,
   });
   token = generateJWTToken(user._id);
});

afterAll(async () => {
   await User.deleteMany();
});

describe('POST /users', () => {
   it('store success', async () => {
      const res = await request(app)
          .post('/users')
          .set('Authorization', 'Bearer ' + token)
          .send(dataUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.name).toEqual(dataUser.name);
      expect(res.body.data.email).toEqual(dataUser.email);
      expect(res.body.data.level).toEqual(dataUser.level);
      expect(res.body.data.is_confirm_account).toEqual(USERS.is_confirm_account.false);
      expect(res.body.data.password).toEqual(hashHmacString(DEFAULT_PASWORD));
   })
});