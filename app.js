const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

module.exports = app;


