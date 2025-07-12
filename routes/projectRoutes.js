import express from 'express';
import Project from '../models/Project.js';
import verifyTokens from '../middleware/verifyTokens.js';
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
} from '../controllers/projectController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/mine', authenticateUser, getMyProjects);
router.post('/', authenticateUser, createProject);

router.put('/:id/like', async (req, res) => {
  const { userId } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const alreadyLiked = project.likedBy.includes(userId);
    project.likedBy = alreadyLiked
      ? project.likedBy.filter(id => id !== userId)
      : [...project.likedBy, userId];

    await project.save();
    res.json({ likedBy: project.likedBy });
  } catch (err) {
    console.error('Like error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id/save', async (req, res) => {
  const { userId } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const alreadySaved = project.savedBy.includes(userId);
    project.savedBy = alreadySaved
      ? project.savedBy.filter(id => id !== userId)
      : [...project.savedBy, userId];

    await project.save();
    res.json({ savedBy: project.savedBy });
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/:id/comment', async (req, res) => {
  const { userId, text } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.comments.push({ userId, text, timestamp: new Date() });
    await project.save();
    res.json(project);
  } catch (err) {
    console.error('Comment error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/liked', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'Missing userId' });

  try {
    const liked = await Project.find({ likedBy: userId });
    res.json(liked);
  } catch (err) {
    console.error('Liked fetch error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/saved', async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ message: 'Missing userId' });

  try {
    const saved = await Project.find({ savedBy: userId });
    res.json(saved);
  } catch (err) {
    console.error('Saved fetch error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id/rate', async (req, res) => {
  const { userId, stars } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const existingRatingIndex = project.ratings.findIndex(r => r.userId === userId);

    if (existingRatingIndex !== -1) {
      project.ratings[existingRatingIndex].stars = stars; // update existing
    } else {
      project.ratings.push({ userId, stars }); // new rating
    }

    await project.save();
    res.json({ ratings: project.ratings });
  } catch (err) {
    console.error('Rating error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id/favorites', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    const { userId } = req.body;

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (!project.favoritedBy) {
      project.favoritedBy = [];
    }

    const index = project.favoritedBy.indexOf(userId);

    if (index === -1) {
      project.favoritedBy.push(userId);
    } else {
      project.favoritedBy.splice(index, 1);
    }

    await project.save();
    res.json({ message: 'Favorite toggled', favoritedBy: project.favoritedBy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while toggling favorite' });
  }
});

router.get('/favorites', async (req, res) => {
  const { userId } = req.query;
  try {
    const favorites = await Project.find({ favoritedBy: userId });
    res.json(favorites);
  } catch (err) {
    console.error('Favorite fetch error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/mine', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const projects = await Project.find({ createdBy: userId });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching user projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authenticateUser, updateProject);
router.delete('/:id', authenticateUser, deleteProject);
router.get('/:id', getProjectById);
router.get('/', getAllProjects);

export default router;

