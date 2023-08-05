class BaseController
{
    handleFieldSearchLike(req, fields = [])
    {
        if (!fields.length) {
            return req;
        }
        for (const field of fields) {
            const fieldValue = req.query[field];

            if (fieldValue) {
                req.query[field] = new RegExp(`${fieldValue}`);
            }
        }

        return req;
    }
}

export default BaseController;