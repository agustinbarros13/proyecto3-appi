const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const upload = require('../middlewares/imageUpload');
const router = express.Router();

router.post('/', (req, res, next) => {
  req.folder = 'users';
  next();
}, upload.single('img'), createUser);

router.put('/:id', (req, res, next) => {
  req.folder = 'users';
  next();
}, upload.single('img'), updateUser);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

module.exports = router;
