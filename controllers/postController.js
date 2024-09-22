const Post = require('../models/Post');
const cloudinary = require('../middlewares/cloudinary');

exports.createPost = async (req, res) => {
  try {
    const { title, content, img, author } = req.body;

    let result;
    if (img) {
      result = await cloudinary.uploader.upload(img, { folder: 'posts' });
    }

    const post = new Post({
      title,
      content,
      img: result?.secure_url || null,
      author,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el post', error: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los posts', error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el post', error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content, img } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (img) {
      if (post.img) {
        const public_id = post.img.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`posts/${public_id}`);
      }
      const result = await cloudinary.uploader.upload(img, { folder: 'posts' });
      post.img = result.secure_url;
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el post', error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (post.img) {
      const public_id = post.img.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`posts/${public_id}`);
    }

    await post.remove();
    res.status(200).json({ message: 'Post eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el post', error: error.message });
  }
};
