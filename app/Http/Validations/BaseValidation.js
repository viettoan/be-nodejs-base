import {responseJoiError, responseJsonByStatus} from "../../Common/helper.js";

export const baseJoiValidator = (schema, typeData = 'body') => {
  return (req, res, next) => {
    let data = null;
    switch (typeData) {
      case 'body':
        data = req.body;
        break;
      case 'query':
        data = req.query;
        break;
      case 'params':
        data = req.params;
        break;
      default:
        data = req.body;
    }
    const result = schema.validate(data);

    if (result.error) {
      return responseJsonByStatus(
        res,
        responseJoiError(422, result.error),
        422
      )
    }
    next();
  }
}