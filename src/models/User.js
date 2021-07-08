const User = require("../mongooseModels/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validate = require("jsonschema").validate;
const signupValidate = require("../../validatorShema/signupValidate");
const loginValidate = require("../../validatorShema/loginValidate");

module.exports = {
  async signup(data) {
    var v = validate(data, signupValidate);
    if (v && v.errors && v.errors.length > 0) {
      throw {
        status: 400,
        error: v.errors[0].stack.replace("instance.", ""),
        message: "Bad Request",
      };
    }

    if (isNaN(data.mobileNo)) {
      throw {
        status: 400,
        error: "Invalid mobile No.",
        message: "Bad Request",
      };
    }

    const userAlreadyExist = await User.findOne({
      $or: [{ email: data.email }, { mobileNo: data.mobileNo }],
    });

    if (userAlreadyExist && userAlreadyExist._id) {
      throw {
        status: 400,
        error: "Email or mobile no. already exist",
        message: "Bad Request",
      };
    }

    var userToSave = {
      name: data.name,
      email: data.email,
      mobileNo: data.mobileNo,
      address: data.address,
      password: await bcrypt.hash(data.password, 8),
      _id: ObjectId(),
    };
    userToSave = new User(userToSave);
    return await this.genratejwtToken(userToSave);
  },

  async genratejwtToken(user) {
    const token = jwt.sign({ _id: user._id }, "jwtKey");
    user.token = token;
    await user.save();
    return { name: user.name, email: user.email, token };
  },

  async login(data) {
    var v = validate(data, loginValidate);
    if (v && v.errors && v.errors.length > 0) {
      throw {
        status: 400,
        error: v.errors[0].stack.replace("instance.", ""),
        message: "Bad Request",
      };
    }
    const user = await User.findOne({ email: data.email });
    if (user && user._id) {
      var isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch) {
        user.token = jwt.sign({ _id: user._id }, "jwtKey");
        await user.save();
        return { email: user.email, token: user.token };
      } else {
        throw {
          status: 401,
          error: "Email or password is wrong",
          message: "Unauthorized",
        };
      }
    } else {
      throw {
        status: 401,
        error: "Email or password is wrong",
        message: "Unauthorized",
      };
    }
  },
};
