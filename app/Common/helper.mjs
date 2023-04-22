import crypto from "crypto";

export const hashHmacString = (string, algorithm = 'sha1') => {
    return crypto.createHmac(algorithm, process.env.PRIVATE_KEY)
        .update(string)
        .digest('hex');
}

export const renderJson = (res, data, statusCode = 200, message) => {
    return res.status(statusCode).json(
        {
            now: new Date(),
            status_code: statusCode,
            data: data,
            message: message
        }
    );
}