import express from "express";
import cors from "cors";
import connectDB from "./db/db";
import apiRouter from './routes/apiRoutes';

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 6008;

app.get("/", (req, res) => {
  res.send("CineMate API is running...");
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
