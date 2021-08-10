const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const morgan = require('morgan');
const app = express();

const passport = require('passport');
const session = require('express-session');

const port = process.env.PORT        || 8080;
const db   = process.env.MONGODB_URI || 'mongodb://localhost/reddit2';


// conexion a la base de datos
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`DB connected @ ${db}`);
  })
  .catch(err => console.error(`Connection error ${err}`));

//React frontend
/*
app.use(express.static('public'));
app.get('/:route', (req, res) => {
  console.log(req.params.route)
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/:route/:secondRoute', (req, res) => {
  console.log(req.params.route)
  res.sendFile(__dirname + '/public/index.html');
});
*/
// middlewares
// parsear bodys con json
app.use(express.json());
// usar cors
app.use(cors());
// logger para desarrollo
app.use(morgan('dev'));
//Express Session
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));
//passport
app.use(passport.initialize());
app.use(passport.session());
require('./api/passportConfig')(passport);
// api router
app.use('/api', require('./api/routes/users'));
app.use('/api', require('./api/routes/posts'));
app.use('/api', require('./api/routes/forums'));

// error handlers (despues de las rutas de la API)
// 404 not found
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  });
  // algun error distinto a not found
  // defaultea a 500
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    // DEBUG: console.error(err.stack)
    res.json({ error: err.message });
  });
  



  // listen
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });


