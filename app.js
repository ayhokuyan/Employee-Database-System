const express = require('express');
const app = express();

const path = require('path');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// We import the employees,js with require 
const employeeRoutes = require('./routes/employees');

// set up the config file
dotenv.config({path : 'config.env'});

//connect to mongodb database
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
});

//set up middleware for bodyparser
app.use(bodyParser.urlencoded({extended : true}))
// set up views folder and the default view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
// set up method override 
app.use(methodOverride('_method'));
// set up session
app.use(session({
    secret: 'pass',
    resave: true,
    saveUninitialized: true
}));
// set up flash
app.use(flash());

//setting messages variables globally 
app.use((req, res, next) => {
    res.locals.successMsg = req.flash(('success_msg'));
    res.locals.errorMsg = req.flash(('error_msg'));
    next();
})




// Tell the app to use the routes in employees.js
app.use(employeeRoutes);


const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server started');
})