var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animal', animalRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

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
