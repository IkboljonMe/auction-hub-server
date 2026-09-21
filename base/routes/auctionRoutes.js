import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
const auctionRouter = express.Router();
import { createNewAuction, getAllAuctions, getSpecificAuction, placeBid, deleteAuctionById } from "../controllers/auction.js";

auctionRouter.post("/", isAuth, createNewAuction);
auctionRouter.get("/", getAllAuctions);
auctionRouter.get("/:id", isAuth, getSpecificAuction);
auctionRouter.post("/:id/bids", isAuth, placeBid);
auctionRouter.delete("/:id", isAuth, isAdmin, deleteAuctionById);

export default auctionRouter;
