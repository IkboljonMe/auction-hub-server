import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";

import database from "./base/database/database.js";
import serverError from "./base/error/serverError.js";
import createSocketServer from "./base/socket/socket.js";
import uploadRouter from "./base/routes/uploadRoutes.js";
import userRouter from "./base/routes/userRoutes.js";
import auctionRouter from "./base/routes/auctionRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
database();
app.use("/api/upload", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/auctions", auctionRouter);
app.use(serverError);

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = createSocketServer(server);

server.listen(port, () => {
  console.log(`Server at port: ${port}`);
});

export { server, io };
