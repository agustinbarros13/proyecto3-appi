const User = require('../models/User');
const cloudinary = require('../middlewares/cloudinary');

exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    
    // Obtener URL 
    const img = req.file ? req.file.path : null;

    const user = new User({
      name,
      img,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (req.file && user.img) {
      const public_id = user.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`users/${public_id}`);
      user.img = req.file.path; // nueva imagen
    }

    user.name = name || user.name;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
  }
};
