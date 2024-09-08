const express = require('express');
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const router = express.Router();

router.post('/posts', createPost);

router.get('/posts', getAllPosts);

router.get('/posts/:id', getPostById);

router.put('/posts/:id', updatePost);

router.delete('/posts/:id', deletePost);

module.exports = router;
