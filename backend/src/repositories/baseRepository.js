class BaseRepository {
  /**
   * @param {import('@prisma/client').Prisma.ModelDelegate} model
   */
  constructor(model) {
    this.model = model;
  }

  /** Fetch multiple records with optional filters, pagination */
  async findAll({ where = {}, skip = 0, take = 100 } = {}) {
    return this.model.findMany({ where, skip, take });
  }

  /** Fetch a single record by its primary key */
  async findById(id) {
    return this.model.findUnique({ where: { id } });
  }

  /** Create a new record */
  async create(data) {
    return this.model.create({ data });
  }

  /** Update an existing record by id */
  async update(id, data) {
    return this.model.update({ where: { id }, data });
  }

  /** Delete a record by id */
  async delete(id) {
    return this.model.delete({ where: { id } });
  }
}

module.exports = BaseRepository;