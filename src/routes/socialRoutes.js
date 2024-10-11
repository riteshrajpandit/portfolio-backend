const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../middleware/auth');

router.get('/', socialController.getAllLinks);
router.post('/', authMiddleware, socialController.createLink);
router.put('/:id', authMiddleware, socialController.updateLink);
router.delete('/:id', authMiddleware, socialController.deleteLink);

module.exports = router;