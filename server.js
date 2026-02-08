import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/db.js";
import urlRouter from "./routes/url.route.js";
import { redirectShortUrl } from "./controllers/url.controller.js";

const app = express();

const PORT = process.env.PORT ?? 4322;

app.use(express.json({ limit: "4kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API is working.");
});

app.use("/api/url", urlRouter);
app.get("/:shortCode", redirectShortUrl);

const start = () => {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  });
};

start();
