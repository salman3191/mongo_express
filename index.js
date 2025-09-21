const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const chat = require("./models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

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
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
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
app.post("/chat", async (req, res, next) => {
  try {
    let { from, to, msg } = req.body;
    let newchat = new chat({
      from: from,
      to: to,
      msg: msg,
      created_at: Date(),
    });
    await newchat.save();

    res.redirect("/chats");
  } catch (err) {
    next(err);
  }
});

// NEW show-route
app.get("/chats/:id", async (req, res, next) => {
  let { id } = req.params;

  let chats = await chat.findById(id);
  if (!chats) {
    return next(new ExpressError(404, "chat not found"));
  }

  res.render("edit.ejs", { chats });
});

// Edit  route
app.get("/chats/:id/edit", async (req, res) => {
  try {
    let { id } = req.params;

    let chats = await chat.findById(id);
    // console.log(chats);
    res.render("edit.ejs", { chats });
  } catch (err) {
    next(err);
  }
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

// Destroy route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;

  let DeleteChat = await chat.findByIdAndDelete(id);
  console.log(DeleteChat);
  res.redirect("/chats");
});

// error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "some error occured" } = err;
  res.status(status).send(message);
});

app.listen(port, () => {
  console.log("server is listening to the port 8080");
});
