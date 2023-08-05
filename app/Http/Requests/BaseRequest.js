import {validationResult} from 'express-validator';
import {responseErrors, responseJsonByStatus} from "../../Common/helper.js";
export const baseRequest = (validations) => {
  return (
    async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
      const errors = validationResult(req);

      if (errors.isEmpty()) {
        return next();
      }

      return responseJsonByStatus(res, responseErrors(422, { errors: errors.array() }), 422);
    }
  )
}