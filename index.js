const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const route = require("./routes/client/index.router");
const routeAdmin = require("./routes/admin/index.router");
const database = require("./config/database");
const systemConfig = require("./config/system");
var bodyParser = require('body-parser') 
var methodOverride = require("method-override");

//App locals biến
app.locals.prefixAdmin = systemConfig.prefixAdmin;

database.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//router
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
