import crypto from "crypto";

export const hashHmacString = (string, algorithm = 'sha1') => {
    return crypto.createHmac(algorithm, process.env.PRIVATE_KEY)
        .update(string)
        .digest('hex');
}

export const responseSuccess = (res, data, statusCode = 200, message) => {
    return res.status(statusCode).json(
        {
            now: new Date(),
            status_code: statusCode,
            data: data,
            message: message
        }
    );
}

export const responseErrors = (res, statusCode = 500, errors) => {
    let dataErrors = {};

    if (errors) {
        dataErrors = Object.values(errors.errors).map(error => {
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

    return res.status(statusCode).json(
        {
            now: new Date(),
            status_code: statusCode,
            errors: dataErrors,
            message: errors.message ?? ''
        }
    );
}