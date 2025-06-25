const prisma         = require('../config/prismaClient');
const UserRepository = require('../repositories/userRepository');
const userRepo       = new UserRepository(prisma);

module.exports = {
  // List all users
  getUsers: () => userRepo.findAll(),

  // Fetch one user by ID
  getUserById: (id) => userRepo.findById(Number(id)),

  // (Optional) fetch by email
  getUserByEmail: (email) => userRepo.findByEmail(email),

  // Create a new user
  createUser: (data) => userRepo.create(data),

  // Update an existing user by ID
  updateUser: (id, data) => userRepo.update(Number(id), data),

  // Delete a user by ID
  deleteUser: (id) => userRepo.delete(Number(id)),
};
