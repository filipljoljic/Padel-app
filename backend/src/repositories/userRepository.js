const BaseRepository = require('./baseRepository');

class UserRepository extends BaseRepository {
  constructor(prisma) {
    super(prisma.user);
  }

  /**
   * Find a user by email (model-specific)
   * @param {string} email
   */
  async findByEmail(email) {
    return this.model.findUnique({ where: { email } });
  }
}

module.exports = UserRepository;