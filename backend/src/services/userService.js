const prisma = require("../config/prismaClient");

// Fetch all users
exports.getUsers = async () => {
  return await prisma.user.findMany();
};

// Create a new user
exports.createUser = async (data) => {
  return await prisma.user.create({
    data,
  });
};
