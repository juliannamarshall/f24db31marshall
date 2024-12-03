var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done){
    Account.findOne({ username: username })
      .then(function(user){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false, { message: 'Incorrect username.' });
        }
        if(!user.validPassword(password)){
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err)
      })
  })
)

require('dotenv').config();
const mongoose = require('mongoose');
const Animal = require('./models/animal');

const MONGO_CON='mongodb+srv://juliannamarshall:Marshall6$@cluster0.zvpt5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(MONGO_CON, {useNewUrlParser: true, useUnifiedTopology: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalRouter = require('./routes/animal');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error.'));
db.once("open", function(){
  console.log("Connection to DB succeeded");
});

async function recreateDB(){
  try{
    await Animal.deleteMany();

    let animal1 = new Animal({ species: "Giraffe", habitat: "Savannah", lifespan: 20 });
    let animal2 = new Animal({ species: "Parrot", habitat: "Jungle", lifespan: 40 });
    let animal3 = new Animal({ species: "Cow", habitat: "Grasslands", lifespan: 15 })
  
    await animal1.save();
    await animal2.save();
    await animal3.save();

    console.log("Animal instances saved successfully!");
  } catch (err){
    console.error("Error seeding database:", err);
  }
}

let reseed = true;
if(reseed){
  recreateDB();
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animal', animalRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

//passport config
//Use the existing connection
//The Account model
var Account=require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
