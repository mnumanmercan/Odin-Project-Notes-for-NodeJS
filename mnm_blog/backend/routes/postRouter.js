import express from 'express';
import { fetchAllPosts } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/posts', fetchAllPosts);

export default postRouter;