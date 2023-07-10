class BaseController
{
  handleParamsWithAuthUser(params = {}, authUser = {}, isCreate = true)
  {
    if (isCreate) {

      return {
        ...params,

      }
    }

    return {
      ...params,
      updated_by: authUser._id,
    }
  }
}

export default BaseController;