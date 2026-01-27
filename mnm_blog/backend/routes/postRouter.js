import express from 'express';
import { fetchAllPosts, fetchPostById, createPost } from '../controllers/postController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const postRouter = express.Router();

postRouter.get('/posts', fetchAllPosts); //- curl http://localhost:3000/api/v1/posts
postRouter.get('/posts/:id', fetchPostById); //- curl http://localhost:3000/api/v1/posts/1


// Protected routes (Sadece admin)
postRouter.post('/posts', authenticateToken, isAdmin, createPost);
// postRouter.put('/posts/:id', authenticateToken, isAdmin, updatePost);
// postRouter.delete('/posts/:id', authenticateToken, isAdmin, deletePost);

export default postRouter;