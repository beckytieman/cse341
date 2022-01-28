const path = require('path');
const PATH = process.env.PORT || 3000;

const cors = require('cors');

const corsOptions = {
  origin: "https://cse341-btieman.herokuapp.com/",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://BTieman:wVMtYy1r23ZMxURA@cluster0.xmdot.mongodb.net/shop?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61f37632444e2cefe99f7d46')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

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
    User.findOne().then(user => {
            if (!user) {
              const user = new User({
              name: 'Becky',
              email: 'becky@test.com',
              cart: {
                items: []
              }
            });
          user.save();
            }
          });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });
