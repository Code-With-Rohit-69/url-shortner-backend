import express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/db.ts";
import urlRouter from "./routes/url.route.ts";
import { redirectShortUrl } from "./controllers/url.controller.ts";

const app = express();

const PORT = Number(process.env.PORT) || 4322;

app.use(express.json({ limit: "4kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("API is working.");
});

app.use("/api/url", urlRouter);
app.get("/:shortCode", redirectShortUrl);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();
