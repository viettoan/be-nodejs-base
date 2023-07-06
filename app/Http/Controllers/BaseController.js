class BaseController
{
    handleParamsWithAuthUser(params = {}, authUser = {}, isCreate = true)
    {
        if (isCreate) {

            return {
                ...params,
                created_by: authUser._id,
                updated_by: authUser._id,
            }
        }

        return {
            ...params,
            updated_by: authUser._id,
        }
    }
}

export default BaseController;