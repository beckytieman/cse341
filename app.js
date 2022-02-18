const path = require('path');
const PORT = process.env.PORT || 3000;

const cors = require('cors');

const corsOptions = {
  origin: "https://cse341-btieman.herokuapp.com/",
  optionsSuccessStatus: 200
};


const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  //useCreateIndex: true,
  //useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://BTieman:wVMtYy1r23ZMxURA@cluster0.xmdot.mongodb.net/shop?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URL,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false, 
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err));
    });
});



app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//app.get('/500,', errorController.get500);

app.use(errorController.get404);

app.use((error, reg, res, next) => {
  //res.render('views/500');
  res.status(500).render('404', { pageTitle: 'Error!', path: '/500',
  isAuthenticated: req.session.isLoggedIn });
});

app.use(cors(corsOptions));
// mongoose
//   .connect('mongodb+srv://BTieman:wVMtYy1r23ZMxURA@cluster0.xmdot.mongodb.net/shop?retryWrites=true&w=majority')
//   .then(result => {
//     User.findOne().then(user => {
//       if (!user) {
//         const user = new User({
//         name: 'Becky',
//         email: 'becky@test.com',
//         cart: {
//           items: []
//         }
//       });
//     user.save();
//       }
//     });
//     app.listen(3000);
//   })
//   .catch(err => {
//     console.log(err);

mongoose
  .connect(
    MONGODB_URL, options
  )
  .then(result => {
    // User.findOne().then(user => {
    //         if (!user) {
    //           const user = new User({
    //           name: 'Becky',
    //           email: 'becky@test.com',
    //           cart: {
    //             items: []
    //           }
    //         });
    //       user.save();
    //         }
    //       });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
