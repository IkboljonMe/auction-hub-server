# Auction Hub Server

Backend for **Auction Hub**, an online auction app where users can create auctions and place bids in real time. It is a REST API with Express and MongoDB, plus Socket.IO so every open page sees new bids immediately. I built it to learn real-time apps and JWT auth with roles.

**Client repo:** [auction-hub-client](https://github.com/IkboljonMe/auction-hub-client)

## Features

- Sign up / sign in with JWT (token lives 30 days)
- User and admin roles
- Create auctions with image upload to Cloudinary
- Place bids, a bid must be higher than the current bid and the auction must not be ended
- New bids are sent to all clients with Socket.IO
- Admin can manage users and delete auctions

## Built with

- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT + bcryptjs
- Cloudinary + Multer (image upload)

## How to run

You need Node.js, MongoDB (local or Atlas) and a free [Cloudinary](https://cloudinary.com/) account for images.

```bash
git clone https://github.com/IkboljonMe/auction-hub-server.git
cd auction-hub-server
npm install
cp .env.example .env
npm run dev
```

Fill `.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auction
JWT_SECRET=any_secret
API_URI=http://localhost:3000        # client url, allowed by socket.io
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Server runs on http://localhost:5000. Use `npm start` to run without nodemon.

To make a user admin, set `isAdmin: true` for them in the `users` collection.

## API

| Method | Route | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/users/signup` | public | Create account |
| POST | `/api/users/signin` | public | Login, returns JWT |
| PUT | `/api/users/profile/:id` | user | Update own profile |
| GET | `/api/users` | admin | All users |
| GET / PUT / DELETE | `/api/users/:id` | admin | Get, edit or delete user |
| GET | `/api/auctions` | public | All auctions |
| GET | `/api/auctions/:id` | user | One auction |
| POST | `/api/auctions` | user | Create auction |
| POST | `/api/auctions/:id/bids` | user | Place bid, body: `{ bidAmount }` |
| DELETE | `/api/auctions/:id` | admin | Delete auction |
| POST | `/api/upload` | admin | Upload image (form field `file`) |

Socket event: after every bid the server emits `bid` with the updated auction.

## Project structure

```
index.js          express + socket.io server
base/
  controllers/    auction, user and upload logic
  models/         Auction and User
  routes/
  middlewares/    isAuth, isAdmin
  socket/         socket.io setup
  database/       mongodb connection
```

---

Made by [IkboljonMe](https://github.com/IkboljonMe)
