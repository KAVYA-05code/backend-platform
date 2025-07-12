import Project from '../models/Project.js';

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveDemo, tags } = req.body;

    const project = new Project({
      title,
      description,
      githubLink,
      liveDemo,
      tags,
      createdBy: req.user.uid,
      user:req.user.uid,
      userName: req.user.name || req.user.email

    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

// GET MY PROJECTS
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.uid }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching user projects:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Error fetching all projects:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET PROJECT BY ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveDemo, tags } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.user !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized to update this project' });
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.githubLink = githubLink || project.githubLink;
    project.liveDemo = liveDemo || project.liveDemo;
    project.tags = tags || project.tags;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error updating project' });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    if (String(project.user) !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized to delete this project' });
    }

    await project.deleteOne(); 

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error deleting project' });
  }
};


