import { NextFunction, Request, Response } from 'express';
import { generateFromEmail, getAllPosts } from './post.service';

export async function generatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
  
    const result = await generateFromEmail(email);
  
    res.status(201).json({
      id: result._id,
      linkedinPost: result.linkedinPost,
      tokensUsed: result.tokensUsed,
    });
  } catch (error) {
    next(error);
  }
}

export async function listPosts(req:Request, res:Response, next:NextFunction) {
  try {
    const posts = await getAllPosts();

    res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

