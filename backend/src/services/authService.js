const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    
const UserRepository = require('../repositories/userRepository');   
const prisma = require('../config/prismaClient'); // Ensure this is imported before using userRepo
const userRepo = new UserRepository(prisma);

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ALGO   = process.env.JWT_ALGORITHM;
const JWT_EXP    = process.env.JWT_EXPIRATION_TIME;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

class AuthService {
  /** Register: hash password & create user */
  async register({ name, email, password }) {
    if (!name || !email || !password) {
      const err = new Error('Name, email & password are required');
      err.status = 400;
      throw err;
    }
    if (await userRepo.findByEmail(email)) {
      const err = new Error('Email already in use');
      err.status = 409;
      throw err;
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await userRepo.create({ name, email, password: hashed });
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      {
        algorithm: JWT_ALGO,
        expiresIn: Number(JWT_EXP)
      }
    );

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }

  /** Login: verify credentials & issue token */
   async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('Email & password are required');
      err.status = 400;
      throw err;
    }
    const user = await userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    // Correctly pass a plain object as the 3rd argument
    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      {
        algorithm: JWT_ALGO,
        expiresIn: Number(JWT_EXP)
      }
    );

    return { user: { id: user.id, name: user.name, email: user.email }, token };
  }
}

module.exports = new AuthService();