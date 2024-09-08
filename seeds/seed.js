const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

async function seed() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user1 = new User({
    name: 'John Doe',
    img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
  });

  await user1.save();
  console.log('Datos de usuario creados');
  mongoose.disconnect();
}

seed();
