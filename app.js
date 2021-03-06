var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    passportLocalMongoose = require('passport-local-mongoose'),
    User = require('./models/user'),
    app = express();



const db = mongoose.connect("mongodb://127.0.0.1:27017/agrotech",(err) => {
    (err) ? console.error(err, 'Error Connecting to Database!'): console.log('DB Connected. Build Safely!');
});
 




app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//require route 
var authRoutes = require('./routes/index');
var inventoryRoutes = require('./routes/inventory');
var helpdeskRoutes = require('./routes/help_desk');



app.use(require('express-session')({
    secret: "boom boom boom",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});



//use routes
app.use('/', authRoutes);
app.use('/inventory', inventoryRoutes );
app.use('/help-desk', helpdeskRoutes );

const port = process.env.PORT || 3008;

app.listen(port, () => {
    console.log('app listening on port 3008........')
})