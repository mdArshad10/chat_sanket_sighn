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
app.use(express.static(join(__dirname, "..")));


app.get("/api/:chatroomId", (req, res, next) => {
  res.status(200).render("index.ejs", {
    id: req.params.chatroomId,
  });
});
app.use("/api/test", express.static(join(__dirname, "..", "public")));

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("msg_send", (data) => {
    console.log(data);
    io.emit("msg_received", data);
  });

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
