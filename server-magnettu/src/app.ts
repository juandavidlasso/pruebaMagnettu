import express from "express";
import cors from "cors";
import postRoutes from "./modules/posts/post.route";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Magnettu!");
});

app.use(errorMiddleware);

export default app;