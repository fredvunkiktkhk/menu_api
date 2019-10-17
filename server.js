const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
// const cors = require('cors');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
mongoose.set('useFindAndModify', false);
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// Use Routes
app.use('/api/foods', require('./routes/api/foods'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/login', require('./routes/api/login'));

// app.use((req, res, next) => {
//   res.header("Acess-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT')
//     return res.status(200).json({});
//   }
// });

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
