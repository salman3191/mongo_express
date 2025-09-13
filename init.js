const mongoose = require("mongoose");
const chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connections sucessful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let Allchats = [
  {
    from: "sehrish",
    to: "salman",
    msg: "I love u ",
    created_at: Date(),
  },

  {
    from: "google",
    to: "salu",
    msg: "welcome salu",
    created_at: Date(),
  },

  {
    from: "microsoft",
    to: "salman",
    msg: "welcome salman! we are happy to congratulation u are selected",
    created_at: Date(),
  },

  {
    from: "sehrish3",
    to: "peter",
    msg: "hey buddy where are you ",
    created_at: Date(),
  },

  {
    from: "rohit",
    to: "mohit",
    msg: "hey hi  ",
    created_at: Date(),
  },

  {
    from: "shradha khapra",
    to: "salman",
    msg: "congratulation salman on first internship at google",
    created_at: Date(),
  },
];

chat.insertMany(Allchats);
