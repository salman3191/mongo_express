const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

main()
  .then(() => {
    console.log("connections sucessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1 = new chat({
//   from: "zennie",
//   to: "salman",
//   msg: "i love u more my jaan",
//   created_at: new Date(),
// });
// chat1
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// index route
app.get("/chats", async (req, res) => {
  let chats = await chat.find();
  res.render("index.ejs", { chats });
  //   console.log(chats);
});
app.get("/", (req, res) => {
  res.send("server working well");
});

// new route

app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

app.listen(port, () => {
  console.log("server is listening to the port 8080");
});
