const express = require('express');
const router  = express.Router();
const userController = require('../controllers/userController');

// CRUD
router.get('/',           userController.getAllUsers);
router.get('/:id',        userController.getUserById);
router.get('/email/:email', userController.getUserByEmail);


router.post('/',          userController.createUser);
router.put('/:id',        userController.updateUser);
router.delete('/:id',     userController.deleteUser);

router.post('/register', userController.register);
router.post('/login',    userController.login);

module.exports = router;