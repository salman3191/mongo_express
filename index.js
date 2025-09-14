const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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

// Create  route (post)
app.post("/chat", (req, res) => {
  let { from, to, msg } = req.body;
  let newchat = new chat({
    from: from,
    to: to,
    msg: msg,
    created_at: Date(),
  });
  newchat
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

// Edit  route

app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;

  let chats = await chat.findById(id);
  // console.log(chats);
  res.render("edit.ejs", { chats });
});

// Update route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;

  let { msg: newMsg } = req.body;
  let UpdatedChat = await chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  res.redirect("/chats");
});

app.listen(port, () => {
  console.log("server is listening to the port 8080");
});
