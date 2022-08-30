// Import all dependencies
import express from "express";
import {
  createUser,
  editNames,
  editPassword,
  editUsername,
  forgotPass,
  getAllUsers,
  getUserbyId,
  userLogin,
  editUser,
} from "../controllers/UserController.js";

import isLogin from "../middlewares/isLogin.js";
import { USER_AUTH } from "../utility/variables/cookieKey.js";

// Route init
const router = express.Router();

// Token Check
router.get("/tokencheck", isLogin, (req, res) => {
  res.status(200).json({
    message: "Logged in",
    tokenKey: USER_AUTH,
    data: {
      firstname: req.userinfo.firstname,
      surname: req.userinfo.surname,
      _id: req.userinfo._id,
    },
    token: req.userinfo.token,
  });
});

// Public Routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserbyId);
router.post("/login", userLogin);
router.post("/forgotpass", forgotPass);

// Protected routes
router.use(isLogin); // Middleware for check user auth
router.patch("/editusername", editUsername);
router.patch("/edituser", editUser);
router.patch("/editnames", editNames);
router.post("/changepass", editPassword);

export default router;
