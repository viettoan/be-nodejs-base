import crypto from "crypto";
import moment from "moment";

export const hashHmacString = (string, algorithm = 'sha1') => {
  return crypto.createHmac(algorithm, process.env.PRIVATE_KEY)
    .update(string)
    .digest('hex');
}

export const generateJWTToken = (userId, algorithm = 'sha1', exp = moment().add(1, 'months').unix()) => {
  const header = JSON.stringify({
    alg: algorithm,
    type: 'JWT'
  });
  const payload = JSON.stringify({
    id: userId,
    iat: moment().unix(),
    exp: exp
  });
  const base64Header = Buffer.from(header).toString('base64').replace('==', '').replace('=', '');
  const base64Payload = Buffer.from(payload).toString('base64').replace('==', '').replace('=', '');
  const signature = hashHmacString(base64Header + "." + base64Payload);

  return base64Header + "." + base64Payload + "." + signature;
}

export const parserJWTToken = (bearerToken, withBearerPrefix = true) => {
  const responseToken = {
    success: false,
  }

  if (!bearerToken) {
    return {...responseToken, errors: 'Token không được để trống!'};
  }

  try {
    let token = [];

    if (withBearerPrefix) {
      token = bearerToken.split(' ')[1].split('.');
    } else {
      token = bearerToken.split('.');
    }
    const base64Header = token[0];
    const base64Payload = token[1];
    const signature = token[2];
    const header = JSON.parse(Buffer.from(base64Header, 'base64').toString());

    if (hashHmacString(base64Header + "." + base64Payload, header.alg) !== signature) {

      return {...responseToken, errors: 'Token không đúng định dạng!'};
    }
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());

    if (moment().unix() > payload.exp) {
      return {...responseToken, errors: 'Token đã hết hạn!'};
    }

    return {...responseToken, success: true, payload};
  } catch (e) {
    return {...responseToken, errors: e.message};
  }
}

export const responseSuccess = (data, statusCode = 200, message = '') => {
  return {
    now: new Date(),
    status_code: statusCode,
    data: data,
    message: message
  };
}

export const responseErrors = (statusCode = 500, errors) => {
  const response = {
    now: new Date(),
    status_code: statusCode,
    errors: [],
    message: ''
  }

  if (typeof errors === 'string') {
    response.message = errors;

    return response;
  }

  if (errors instanceof Error && errors.name === 'MongoServerError') {
    const [path, value] = Object.entries(errors.keyValue)[0];

    switch (errors.code) {
      case 11000:
        response.errors.push({
          [path]: {
            value,
            message: capitalizeFirstLetter(path) + ' đã tồn tại'
          }
        })
        break;
      default:
        response.message = errors.message;
    }

    return response
  }

  if (errors instanceof Error) {
    response.message = errors.message;

    return response;
  }

  if (typeof errors === 'object') {
    response.message = errors.message ?? '';
    response.errors = Object.values(errors.errors).map(error => {
      let message = '';

      if (error?.message) {
        message = error.message;
      }

      if (error?.msg) {
        message = error.msg;
      }

      return {
        [error.path]: {
          value: error.value,
          message
        }
      }
    })
  }

  return response;
}

export const responseJoiError = (statusCode = 500, errors) => {
  const response = {
    now: new Date(),
    status_code: statusCode,
    errors: [],
    message: ''
  }
  response.errors = errors.details.map(
    error => {
      return {
        [error.context.key] : {
          value: error.context.value,
          message: error.message
        }
      };
    }
  )
  return response;
}

export const responseJsonByStatus = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
}

export const generateConfirmUrl = (userId) => {
  const token = generateJWTToken(userId, 'sha1', moment().add(1, 'days').unix());

  return process.env.FE_DOMAIN + 'confirm-account?token=' + token;
}

export const generateDetailUserUrl = (userId) => {
  return process.env.FE_DOMAIN + 'users/' + userId + '/edit';
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getUrlAvatar(avatar) {
  if (!avatar) {
    return process.env.DOMAIN + '/images/default.png';
  }

  return process.env.DOMAIN + '/' + avatar;
}

export function getUrlAvatarRoom(avatar) {
  if (!avatar) {
    return process.env.DOMAIN + '/images/default.png';
  }

  return process.env.DOMAIN + '/' + avatar;
}