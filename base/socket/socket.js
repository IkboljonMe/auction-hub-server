import { Server } from "socket.io";
import Auction from "../models/auctionModel.js";

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.API_URI, "http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinAuction", async (auctionId) => {
      try {
        const auction = await Auction.findById(auctionId);

        if (!auction) {
          console.log(`[Socket] Auction not found ${auctionId}`);
          socket.emit("auctionError", { message: "Auction not found" });
        } else {
          console.log(`[Socket] Joining auction ${auctionId}`);
          socket.join(auctionId);
          socket.emit("auctionData", auction);
        }
      } catch (error) {
        console.log(`[Socket] Error joining auction ${auctionId}: ${error.message}`);
        socket.emit("auctionError", { message: "Server Error" });
      }
    });

    socket.on("leaveAuction", (auctionId) => {
      console.log(`[Socket] Leaving auction ${auctionId}`);
      socket.leave(auctionId);
    });

    socket.on("disconnect", () => {});
  });

  return io;
};

export default createSocketServer;
