const mongoose = require('mongoose');

const DB = process.env.DB_URI;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;