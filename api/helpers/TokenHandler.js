import jwt from "jsonwebtoken";

class Token {
  /**
   * This method will generate a json web token
   * @param {Object} data
   */
  static generate(data) {
    return jwt.sign(
      {
        ...data,
        exp: new Date(Date.now() + 3600000).getTime(),
      },
      process.env.TOKEN_SECREATE
    );
  }

  /**
   * This method will decode the token
   * @param {Token String} token
   * @returns
   */
  static async match(token) {
    let result = "";
    jwt.verify(token, process.env.TOKEN_SECREATE, (err, decoded) => {
      if (err) {
        result = err;
        return;
      }
      result = decoded;
    });
    return result;
  }
}

export default Token;
