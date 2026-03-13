import express from "express";
import cors from "cors";
import personsRouter from "./routes/persons";
import authRouter from "./routes/auth";
import postsRouter from "./routes/posts";
import reactionsRouter from "./routes/reactions";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());


app.get("/", (_req, res) => {
    res.send("Treelook backend is running");
});

app.use("/persons", personsRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/reactions", reactionsRouter);

app.listen(PORT, () => {
    console.log(`Treelook backend listening on http://localhost:${PORT}`);
});