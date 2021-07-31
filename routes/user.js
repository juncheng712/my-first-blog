const express = require('express');
const router = express.Router();
const { create_user, get_users, login_user, delete_users } = require("../controllers/user")


router.route("/register").post(create_user);

router.route("/users").get(get_users);

router.route("/login").post(login_user);

router.route("/delete-user/:id").delete(delete_users);



module.exports = router;