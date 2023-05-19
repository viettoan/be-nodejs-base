class BaseRepository
{
    model = null;

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

    async store(data)
    {
        const currentTime = new Date();
        data.created_at = data.updated_at = currentTime;

        return await this.getModel().create(data);
    }

    async findBy(conditions = {}, sort = {})
    {
        return await this.getModel().find({...conditions, deleted_at: null}).sort(sort);
    }

    async findById(id)
    {
        return await this.getModel().findOne({
            _id: id,
            deleted_at: null
        });
    }

    async update(id, data)
    {
        data.updated_at = new Date();
        await this.getModel().findByIdAndUpdate(id, data)

        return true;
    }

    async delete(id)
    {
        await this.getModel().findByIdAndUpdate(id, {
            deleted_at: new Date()
        });

        return true;
    }
}

export default BaseRepository;