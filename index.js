const express = require("express");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT;
// Web server
const app = express();

// Socket server
const server = require("http").createServer(app);
module.exports.io = require("socket.io")(server);
require("./sockets/socket");

// Default web
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Server running on port ${port}`);
});
