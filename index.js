const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const route = require("./routes/client/index.router");
const routeAdmin = require("./routes/admin/index.router");
const database = require("./config/database");
const systemConfig = require("./config/system");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var flash = require("express-flash");
var cookieParser = require('cookie-parser')
var session = require('express-session')
var path = require('path');

// socket.io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
global._io = io;



/* end socket.io*/

// thư viện convert timestamp
const moment = require("moment")

//App locals biến - chỉ sử dụng được trong file pug - các file khác muốn sử dụng phải require vào
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment

database.connect();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//express-flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

//tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));




//router
route(app);
routeAdmin(app);
// Trang error
app.get("*", (req, res) => {
  res.render("client/pages/error/404",{
    pageTitle: " 404 not found"
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
