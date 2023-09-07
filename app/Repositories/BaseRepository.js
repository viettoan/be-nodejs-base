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

  findOne(conditions)
  {
    return this.getModel().findOne({...conditions, deleted_at: null});
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

  async paginate(
    conditions = {},
    limit = PAGINATE_OPTIONS.limit,
    page = PAGINATE_OPTIONS.page,
    softDelete = true
  )
  {
    limit = +limit || PAGINATE_OPTIONS.limit;
    page = +page || PAGINATE_OPTIONS.page;
    if (softDelete) {
      conditions.deleted_at = null;
    }
    const [data, total] = await Promise.all([
      this.getModel().find(conditions).skip(limit * (page - 1)).limit(limit),
      this.getModel().count(conditions)
    ]);

    return {
      data,
      total,
      limit,
      page,
      totalPage: Math.ceil(total/limit)
    };
  }
}

export default BaseRepository;