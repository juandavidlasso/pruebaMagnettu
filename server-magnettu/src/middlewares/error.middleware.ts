import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError";


export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    const message = err.message || 'Internal Server Error';

    res.status(500).json({ error: message });
}