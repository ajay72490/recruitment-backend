const router = new express.Router();
const UserModel = require("../models/User");
var authMiddleware = require("../../middleware/auth");
const User = require("../mongooseModels/User");

router.post("/signup", async (req, res) => {
  try {
    res.status(200).json(await UserModel.signup(req.body));
  } catch (err) {
    console.log(err);
    if (err.status && err.error) {
      return res.status(err.status).json(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    res.status(200).json(await UserModel.login(req.body));
  } catch (err) {
    console.log(err);
    if (err.status && err.error) {
      return res.status(err.status).json(err);
    } else {
      res.status(500).send(err);
    }
  }
});

router.post("/getMyProfile", authMiddleware, async (req, res) => {
  try {
    console.log("req.user", req.user);
    const user = await User.findOne(
      { _id: req.user._id },
      { password: 0, token: 0 }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
