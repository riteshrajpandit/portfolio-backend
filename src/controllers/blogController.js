const { Blog } = require('../models');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Blog.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Blog.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Blog.create({ title, content });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const [updated] = await Blog.update({ title, content }, { where: { id: req.params.id } });
    if (updated) {
      const updatedPost = await Blog.findByPk(req.params.id);
      return res.json(updatedPost);
    }
    throw new Error('Post not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await Blog.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(204).send("Post deleted");
    }
    throw new Error('Post not found');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};