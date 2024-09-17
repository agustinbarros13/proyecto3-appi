const User = require('../models/User');
const cloudinary = require('../middlewares/cloudinary');

// Crear un usuario
exports.createUser = async (req, res) => {
  try {
    const { name, img } = req.body;

    let result;
    if (img) {
      result = await cloudinary.uploader.upload(img, { folder: 'users' });
    }

    const user = new User({
      name,
      img: result?.secure_url || null,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario
exports.updateUser = async (req, res) => {
  try {
    const { name, img } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (img) {
      if (user.img) {
        const public_id = user.img.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`users/${public_id}`);
      }
      const result = await cloudinary.uploader.upload(img, { folder: 'users' });
      user.img = result.secure_url;
    }

    user.name = name || user.name;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.img) {
      const public_id = user.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`users/${public_id}`);
    }

    await user.remove();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

