const { io } = require("../index");

// Socket server
io.on("connection", (client) => {
  console.log("client connected", client.id);
  client.on("disconnect", () => {
    console.log("client disconnected", client.id);
  });
  client.on("message", (data) => {
    console.log("message", data, client.id);
    io.emit("message", { message: data, sender: client.id });
  });
});
