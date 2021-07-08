require("./global.js");
require("./db/mongoose");
var app = express();

app.use(express.json());

const userRouter = require("./src/routes/userRouter");
const applicationRouter = require("./src/routes/applicationRouter");
const adminRouter = require("./src/routes/adminRoutes");

app.use(userRouter);
app.use(applicationRouter);
app.use(adminRouter);

app.listen(3000, function (req, res) {
  console.log("Server starte on port 3000");
});
