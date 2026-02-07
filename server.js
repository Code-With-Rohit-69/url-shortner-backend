import express from "express"
import cors from "cors"
import "dotenv/config";
import connectDB from "./db/db.js";
import urlRouter from "./routes/url.route.js";

const app = express();

const PORT = process.env.PORT ?? 4322;

app.use(express.json({ limit: "4kb" }));
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is working.");
});

app.use("/api/url", urlRouter)

const start = () => {
    connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}

start();