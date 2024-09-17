const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const users = [
    {
      name: 'Pepito Doe',
      img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
    },
    {
      name: 'Mark Doe',
      img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
    },
    {
      name: 'juanito Doe',
      img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
    },
    {
      name: 'charles Doe',
      img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
    },
    {
      name: 'Matías lopez',
      img: 'https://res.cloudinary.com/demo/image/upload/v1620747510/sample.jpg',
    },
  ];

  await User.insertMany(users);
  console.log('Datos de usuario creados');
  mongoose.disconnect();
}

seed();

