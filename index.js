const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "meetings",
  })
  .then((c) => console.log("Database connected"))
  .catch((e) => console.log(e));

const meetingSchema = new mongoose.Schema({
  summary: String,
  description: String, 
  location: String,
  starteDateTime: String,
  endDateTime: String,
});

const Meet = mongoose.model("Meet", meetingSchema);

const meetings = []; //meeting is array that stores meeting details

// using middleware for getting the static file
// app.use(express.static(path.join(path.resolve(), "public")))
// to use the static file in the home page
// app.get('/', (req, res)=> {
//   res.sendFile("index")
// })

// using middleware for getting the data from the form submit
app.use(express.urlencoded({ extended: true }));
app.post("/", async (req, res) => {
  const { summary, description, location, starteDateTime, endDateTime } =
    req.body;

  const meetingData = {
    summary: summary,
    description: description,
    location: location,
    starteDateTime: starteDateTime,
    endDateTime: endDateTime,
  };

  await Meet.create(meetingData);        // sending the data to the database i.e- mongodb

  res.render("sucess");
  // res.redirect("/sucess");    //redirecting to the given url
});

app.get("/meetings", (req, res) => {
  res.json({
    meetings,
  });
});

// Setting up the view
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(4000, () => {
  console.log("Server is running hurray!!!");
});
