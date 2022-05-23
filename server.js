const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/Social-Network-Api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.on('connected', () =>
  console.log('Connected to mongoDb Endpoint'));

mongoose.connection.on('error', (err) => console.log(`Mongoose Disconnected error: ${err}`));


mongoose.set("debug", true);
app.use(require('./routes'));
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));