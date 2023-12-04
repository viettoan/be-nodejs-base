class BaseController
{
    handleFieldSearchLike(params, fields = [])
    {
        const conditions = {};

        for (const key in params) {
            if (key !== 'limit' && key !== 'page') {
                conditions[key] = params[key];
            }
        }

        if (!fields.length) {
            return conditions;
        }

        for (const field of fields) {
            const fieldValue = conditions[field];

            if (fieldValue) {
                conditions[field] = new RegExp(`${fieldValue}`);
            }
        }

        return conditions;
    }
}

export default BaseController;