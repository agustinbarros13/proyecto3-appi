const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const upload = require('../middlewares/imageUpload');
const router = express.Router();

router.post('/', (req, res, next) => {
  req.folder = 'posts';
  next();
}, upload.single('img'), createPost);

router.put('/:id', (req, res, next) => {
  req.folder = 'posts'; 
  next();
}, upload.single('img'), updatePost);

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);

module.exports = router;
