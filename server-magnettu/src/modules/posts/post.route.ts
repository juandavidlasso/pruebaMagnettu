import { Router } from 'express';
import { generatePost, listPosts } from './post.controller';

const router = Router();

router.post('/generate', generatePost);
router.get('/', listPosts);

export default router;
