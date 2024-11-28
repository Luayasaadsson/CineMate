import express from "express";
import authRoutes from "./authRoutes";
import favoriteMoviesRoutes from "./favoriteMoviesRoutes";

const apiRouter = express.Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/favorites", favoriteMoviesRoutes);

export default apiRouter;
