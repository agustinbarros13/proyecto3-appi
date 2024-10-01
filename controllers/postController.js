const Post = require('../models/Post');
const cloudinary = require('../middlewares/cloudinary');

exports.createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    // Obtener la URL
    const img = req.file ? req.file.path : null;

    const post = new Post({
      title,
      content,
      img,
      author,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el post', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (req.file && post.img) {
      const public_id = post.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`posts/${public_id}`);
      post.img = req.file.path; //nueva imagen
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
  }
};
