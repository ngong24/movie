const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const moment = require("moment");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const database = require("./config/database");
database.connect();
const systemConfig = require("./config/system");

const router = require("./routers/client/index.router");
const routerAdmin = require("./routers/admin/index.router");

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// Use express flash
app.use(cookieParser("FSDFEWRTRWT"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// End use express flash

// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE


app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// App Locals Variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;
// End App Locals Variable

app.use(express.static(`${__dirname}/public`));

// Router
router(app);
routerAdmin(app);
// End router

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});