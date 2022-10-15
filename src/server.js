import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routers.js";
import urlRouter from "./routes/url.routers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(urlRouter);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));