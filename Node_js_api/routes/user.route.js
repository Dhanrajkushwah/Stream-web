const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// User-related routes
router.route('/list')
    .get(userController.list);

router.route('/signup')
    .post(userController.registerUser);

router.route('/login')
    .post(userController.loginUser);
    
module.exports = router;
