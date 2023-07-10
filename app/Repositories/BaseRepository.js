import {PAGINATE_OPTIONS} from "../../config/constant.js";
class BaseRepository
{
  constructor(model) {
    this.setModel(model)
  }

  getModel()
  {
    return this.model;
  }

  setModel(model)
  {
    this.model = model;
  }

  store(data, user)
  {
    if (user) {
      return this.getModel().create({
        ...data,
        created_by: user._id ?? null,
        updated_by: user._id ?? null,
      });
    }
    return this.getModel().create(data);
  }

  findBy(conditions = {}, sort = {})
  {
    return this.getModel().find({...conditions, deleted_at: null}).sort(sort);
  }

  findById(id)
  {
    return this.getModel().findOne({
      _id: id,
      deleted_at: null
    });
  }

  update(id, data, user)
  {
    if (user) {
      return this.getModel().findByIdAndUpdate(id, {
        ...data,
        updated_by: user._id ?? null,
      });
    }

    return this.getModel().findByIdAndUpdate(id, data);
  }

  delete(id)
  {
    return this.getModel().findByIdAndUpdate(id, {
      deleted_at: new Date()
    });
  }

  paginate(conditions = {}, options = {})
  {
    if (typeof options.sort !== 'object') {
      options.sort = PAGINATE_OPTIONS.sort;
    }

    if (!options.page || options.page < 1) {
      options.page = PAGINATE_OPTIONS.page;
    }

    if (!options.limit || options.limit < 0) {
      options.limit = PAGINATE_OPTIONS.limit;
    }
    delete conditions.pagination;

    return this.getModel().paginate({...conditions, deleted_at: null}, options);
  }
}

export default BaseRepository;