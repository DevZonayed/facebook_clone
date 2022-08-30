// Import Dependencies
import createError from "../helpers/CustomError.js";
import Token from "../helpers/TokenHandler.js";
import { USER_AUTH } from "../utility/variables/cookieKey.js";

async function isLogin(req, res, next) {
  try {
    const token = await req.cookies[USER_AUTH];

    // Token Validation Check
    if (!token) {
      next(createError("Token not found", 404));
      return;
    }
    const login = await Token.match(token);

    if (login.message) {
      next(createError("Invalid token", 401));
      return;
    }
    if (login.exp < Date.now()) {
      next(createError("Token expire please login again", 401));
      return;
    }

    //===============Validation Complete================//

    req.userinfo = {
      _id: login._id,
      username: login.username,
      firstname: login.firstname,
      surname: login.surname,
      token,
    };
    next();
  } catch (err) {
    next(createError(err));
  }
}

export default isLogin;
