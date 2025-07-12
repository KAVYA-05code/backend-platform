import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  githubLink: {
    type: String,
    required: true
  },
  liveDemo: {
    type: String
  },
  user: {
    type: String,
    required: true
  },

  likedBy: [{ type: String }], 
  savedBy: [{ type: String }],
  comments: [{
    userId: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
  }],
  favoritedBy: [{ type: String }], 
createdBy: String,
  ratings: [{
    userId: String,
    stars: Number
  }]
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);

