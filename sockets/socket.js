const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();
bands.add(new Band("Queen"));
bands.add(new Band("David Bowie"));
bands.add(new Band("Pink Floyd"));
bands.add(new Band("The Beatles"));

// Socket server
io.on("connection", (client) => {
  console.log("client connected", client.id);

  client.emit("activeBands", bands.getAll());

  client.on("disconnect", () => {
    console.log("client disconnected", client.id);
  });
  client.on("message", (data) => {
    console.log("message", data, client.id);
    io.emit("message", { message: data, sender: client.id });
  });
  client.on("sendMessage", (data) => {
    console.log(data);
    client.broadcast.emit("newMessage", { message: data, sender: client.id });
  });
  client.on("addVote", (payload) => {
    console.log(`Vote added to band id ${payload}`);
    bands.addVote(payload);
    io.emit("activeBands", bands.getAll());
  });
  client.on("deleteBand", (payload) => {
    console.log(`Band id ${payload} deleted`);
    bands.remove(payload);
    io.emit("activeBands", bands.getAll());
  });
  client.on("addBand", (payload) => {
    console.log(`Band ${payload} added`);
    bands.add(new Band(payload));
    io.emit("activeBands", bands.getAll());
  });
});
