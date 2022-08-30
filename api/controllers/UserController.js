import isEmail from "validator/lib/isemail.js";
import createError from "../helpers/CustomError.js";
import bcrypt from "bcrypt";
import parsePhoneNumberFromString from "libphonenumber-js";
// Models
import User from "../models/UserModel.js";
import Token from "../helpers/TokenHandler.js";
import alphabet_count from "../helpers/AlphabetCount.js";
import { otpGen } from "../utility/functions/otpgenerator.js";
import Otpmodel from "../models/OtpModel.js";
import { FORGOT_PASS, USER_AUTH } from "../utility/variables/cookieKey.js";
import sendSms from "../utility/functions/SmsSend.js";
import sendMail from "../utility/functions/EmailSend.js";
import { PASS_RESET_OTP } from "../utility/variables/mailType.js";

/**
 * @Requist = GET
 * @Route = /user
 * @type { Public }
 * @param {Requist} req
 * @param {Response} res
 * @param {Next Middleware} next // In this Controller this is use for error handleing
 * @returns
 */
async function getAllUsers(req, res, next) {
  try {
    const allUser = await User.find({}, "_id fullname username");

    // User Not Found
    if (allUser.length == 0) {
      next(createError("User not found", 404));
      return;
    }

    // Send Final Output to response
    res.status(200).json({
      message: "User Get Successfull",
      data: allUser,
    });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * This Controllar will get user by Id
 * @request GET
 * @Route /user
 * @type {Public}
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function getUserbyId(req, res, next) {
  try {
    const { id } = req.params;
    const user_data = await User.findById({ _id: id }, "-password -token");
    // User Not Found
    if (user_data.length == 0) {
      next(createError("User not found", 404));
      return;
    }

    // Send Final Output to response
    res.status(200).json({
      message: "User Get Successfull",
      data: user_data,
      tokenKey: USER_AUTH,
    });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * @Requist = Post
 * @Route = /user
 * @type { Public }
 * @param {Request} req
 * @param {Res} res
 * @param {Next} next // In this case it will use foe error handle
 * @returns
 */
async function createUser(req, res, next) {
  try {
    const { auth, firstname, surname, password, dateofbirth, gender } =
      req.body;
    let finalData = {};

    // Detact auth is mail or phone number
    if (alphabet_count(auth) > 3) {
      if (isEmail(auth)) {
        const email = auth;
        finalData = {
          firstname,
          surname,
          dateofbirth,
          gender,
          email,
        };
      } else {
        next(createError("Email not valid", 400));
        return;
      }
    } else if (typeof parseInt(auth) === "number") {
      // Phone Number Validation Start
      const phoneNumber = parsePhoneNumberFromString(auth);
      if (!phoneNumber) {
        next(
          createError(
            "Mobile number not valid (Please insert your country code before the number)",
            400
          )
        );
        return;
      }
      // Number Validation end
      const cell = phoneNumber.number;
      finalData = {
        firstname,
        surname,
        dateofbirth,
        gender,
        cell,
      };
    } else {
      next(createError("Email not valid", 400));
      return;
    }
    // User Creation Script
    // Password hash
    const hash = await bcrypt.hash(password, 10);

    const userData = new User({
      ...finalData,
      password: hash,
    });

    const finalUserInfo = await userData.save();

    /**This veriable will exclude some valur and make a filter info */
    const {
      firstname: firstName,
      surname: surName,
      username: userName,
      _id: id,
    } = finalUserInfo._doc;

    // Genarate Json web token
    const token = Token.generate({
      firstname: firstName,
      surname: surName,
      username: userName,
      _id: id,
    });

    // Send Data to Response
    res
      .cookie(USER_AUTH, token)
      .status(201)
      .json({
        message: "User register Successful",
        tokenKey: USER_AUTH,
        data: { firstname: firstName, surname: surName, _id: id },
        token,
      });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      next(createError(`${Object.keys(err.keyPattern)} already exists`, 400));
    } else {
      next(createError(err));
    }
  }
}

/**
 * Login Controller
 * @Request Post
 * @route /user/login
 * @type {Public}
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
async function userLogin(req, res, next) {
  try {
    const { auth, password } = req.body;
    // Find user by this auth
    const userData = await User.find({
      $or: [{ email: auth }, { cell: auth }],
    });
    if (userData.length == 0) {
      next(createError("Invalid email or password", 401));
      return;
    }

    const user = userData[0];
    // Password Validate

    const isPassValid = await bcrypt.compare(password, user.password);

    if (!isPassValid) {
      next(createError("Invalid Password", 401));
      return;
    }

    // Generate token
    const token = Token.generate({
      _id: user._id,
      username: user.username,
      firstname: user.firstname,
      surname: user.surname,
    });

    // Update token to user
    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { tokens: [{ token }] } }
    );
    res
      .cookie(USER_AUTH, token)
      .status(200)
      .json({
        message: "Login Success",
        tokenKey: USER_AUTH,
        token: token,
        data: {
          firstname: user.firstname,
          surname: user.surname,
          username: user.username,
          _id: user._id,
        },
      });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * Username edit
 * @requist Patch
 * @type {protected}
 * @route /user/editusername
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function editUsername(req, res, next) {
  try {
    const { _id } = req.userinfo;
    const { username } = req.body;
    // Update the database
    const updateUserName = await User.updateOne(
      { _id },
      {
        username,
      }
    );
    // Validation
    if (updateUserName.matchedCount > 0 && updateUserName.modifiedCount == 0) {
      next(createError("Username already exist", 409));
      return;
    }
    // Send response
    res.status(200).json({
      message: "Username Update Successful",
    });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * Username edit
 * @requist Patch
 * @type {protected}
 * @route /user/edituser
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function editUser(req, res, next) {
  try {
    const { _id } = req.userinfo;
    const { firstname, username, surname, dateofbirth, gender, email, cell } =
      req.body;
    // Update the database
    const updateUserName = await User.updateOne(
      { _id },
      {
        username,
        firstname,
        surname,
        dateofbirth,
        gender,
        email,
        cell,
      }
    );
    // Validation
    if (updateUserName.matchedCount > 0 && updateUserName.modifiedCount == 0) {
      next(createError("Username already exist", 409));
      return;
    }
    // Send response
    res.status(200).json({
      message: "Username Update Successful",
    });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * Username edit
 * @requist Patch
 * @type {protected}
 * @route /user/editfullname
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
async function editNames(req, res, next) {
  try {
    const { _id } = req.userinfo;
    const { firstname, surname } = req.body;
    // Update the database
    await User.updateOne(
      { _id },
      {
        firstname,
        surname,
      }
    );
    // Send response
    res.status(200).json({
      message: "Fullname Update Successful",
    });
  } catch (err) {
    next(createError(err));
  }
}

/**
 * Change pass with old pass and new pass
 * @method post
 * @type {protected}
 * @route /user/changepass
 * @param {oldpass & newpass} req
 * @param {*} res
 * @param {error} next
 * @returns
 */
async function editPassword(req, res, next) {
  const { oldpass, newpass } = req.body;
  //Old pass empty validation
  if (!oldpass) {
    next(createError("Old Password missing", 404));
    return;
  }
  //New pass empty validation
  if (!newpass) {
    next(createError("New Password missing", 404));
    return;
  }

  // User info
  const { _id } = req.userinfo;
  const user = await User.findById(_id);

  // Old Pass Validation
  const isPassValid = await bcrypt.compare(oldpass, user.password);
  if (!isPassValid) {
    next(createError("Invalid old password"), 401);
    return;
  }
  // Hash password
  const hash = await bcrypt.hash(newpass, 10);

  const updateStatus = await User.findByIdAndUpdate(_id, {
    password: hash,
  });

  if (updateStatus.isModified) {
    res.status(200).json({
      message: "Password Update Successful",
    });
  } else {
    next(createError("Something went wrong!"));
  }
}

async function forgotPass(req, res, next) {
  try {
    const { otp, auth, password } = req.body;

    // Check cookiw data for forgot pass
    const for_cookies = req.cookies[FORGOT_PASS];

    if (for_cookies != undefined) {
      if (for_cookies?.exp < Date.now()) {
        res.clearCookie(FORGOT_PASS);
        next(createError("Password Reset timeout", 401));
        return;
      }

      if ((password == "", password == undefined, !password)) {
        next(createError("Please enter a password", 401));
        return;
      }

      // Pass Hash
      const hash = await bcrypt.hash(password, 10);
      // const updateStatus = await
      const updateUser = await User.updateOne(
        { _id: for_cookies.user },
        {
          password: hash,
        }
      );

      if (updateUser.modifiedCount > 0) {
        res.clearCookie(FORGOT_PASS).status(200).json({
          message: "Password Update Successful",
        });

        return;
      } else {
        next(createError("Something went wrong!", 510));
        return;
      }
    }
    // Send Otp Process
    if (otp == null || otp == "" || otp == undefined || !otp) {
      //Delete all expire Otp from modal
      await Otpmodel.deleteMany({ exp: { $lte: Date.now() } });

      // Find the user
      const userDetails = await User.findOne({
        $or: [{ email: auth }, { cell: auth }],
      });

      // Auth recognizeing
      let email = false;
      let cell = false;

      if (alphabet_count(auth) > 3) {
        if (isEmail(auth)) {
          email = auth;
        } else {
          next(createError("Email not valid", 400));
          return;
        }
      } else if (typeof parseInt(auth) === "number") {
        // Phone Number Validation Start
        const phoneNumber = parsePhoneNumberFromString(auth);
        if (!phoneNumber) {
          next(
            createError(
              "Mobile number not valid (Please insert your country code before the number)",
              400
            )
          );
          return;
        }
        // Number Validation end
        cell = phoneNumber.number;
      } else {
        next(createError("Email or cell not valid", 400));
        return;
      }
      //============================

      //====================User Validation======
      if (userDetails == null) {
        if (email) {
          next(createError("User not found in this email", 404));
          return;
        } else if (cell) {
          next(createError("User not found in this phone number", 404));
          return;
        } else {
          next(createError("Please input valid email or phone number", 401));
          return;
        }
      }
      //========================================
      // Otp code send to database
      const otp = otpGen();
      const otpCode = new Otpmodel({
        otp,
        user: userDetails._id,
      });
      await otpCode.save();
      //========================
      if (cell) {
        // Send Security code by sms
        const smsSend = await sendSms(
          cell,
          `Greetings from Zonayed , Your pass reset code is ${otp}`
        );

        // Genarate Response message based on sms status
        let resData = {
          status: 401,
          message: "Something went wrong",
        };
        if (smsSend.data.response_code == 202) {
          resData = {
            status: 200,
            message: "We have send a security code to your number",
          };
        } else {
          resData = {
            status: 401,
            message: `Something went wrong please use email and this is a demo website for portfolio that's why we share the code with you for reset password please use ${otp} this code for reset the password`,
          };
        }

        // Send response to client side
        res.status(resData.status).json({
          message: resData.message,
        });

        return;
      } else {
        // Send Email to user
        const info = await sendMail({
          to: email,
          type: PASS_RESET_OTP,
          sub: "Password Reset email",
          code: otp,
        });
        //=================
        // Send response to client side
        if (info?.accepted.length > 0) {
          res.status(200).json({
            message: "We have send a Security code in your E-mail !",
          });
          return;
        } else {
          res
            .status(200)

            .json({
              message: "Something went wrong",
            });

          return;
        }
      }
    } else {
      // Verify otp process

      // Get forgot data

      // Find Otp Data
      const optdata = await Otpmodel.findOne({
        $and: [{ exp: { $gte: Date.now() } }, { otp }],
      });
      // Validation the otp
      if (optdata == null) {
        next(createError("Invalid Otp !", 401));
        return;
      }
      res
        .status(200)
        .cookie(FORGOT_PASS, {
          _id: optdata._id,
          user: optdata.user,
          exp: Date.now() + 1000 * 60 * 10,
        })
        .json({
          message: "Otp Data Found !",
          otp: optdata,
        });
    }
  } catch (err) {
    next(createError(err));
  }
}

// Export all user controller
export {
  getAllUsers,
  createUser,
  userLogin,
  getUserbyId,
  editUsername,
  editNames,
  editPassword,
  forgotPass,
  editUser,
};
