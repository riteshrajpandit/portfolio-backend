const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/auth');

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getPost);
router.post('/', authMiddleware, blogController.createPost);
router.put('/:id', authMiddleware, blogController.updatePost);
router.delete('/:id', authMiddleware, blogController.deletePost);

module.exports = router;