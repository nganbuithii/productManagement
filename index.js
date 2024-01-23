const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const route = require("./routes/client/index.router");
const routeAdmin = require("./routes/admin/index.router");
const database = require("./config/database");

database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

//router
route(app);
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
