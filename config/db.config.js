const mongoose = require('mongoose');

const server = 'mongodb://localhost:27017/test';

mongoose.connect(server, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;