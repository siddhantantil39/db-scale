var express = require('express');
var router = express.Router();
const UserController = require('../controllers/user.controller');

/* POST users listing. */
router.post('/user', UserController.createUser);

//GET users listing
router.get('/user/:id', UserController.getUserById);

//GET list of users listing
router.get("/all", UserController.getAllUsers);

module.exports = router;
