const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("node:path");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const dbConnection = require("./config/db.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.set("view engine", "index");
app.use("/api", express.static(join(__dirname, "..", "public")));
app.use("/api/:chatroomId", (req, res, next) => {
  res.status(200).render("index.ejs");
});

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  setInterval(() => {
    io.emit("backend_connection", { message: "welcome back" });
  }, 3000);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, async () => {
  try {
    await dbConnection();
    console.log("server running at http://localhost:3000");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});
