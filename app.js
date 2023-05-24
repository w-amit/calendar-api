import express from "express";
import mongoose from "mongoose";


const app = express();

// Using Middlewares
app.use(express.json()); // to show the data in the json format in the browser

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "meetingsapi",
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

app.get("/", (req, res) => {
  res.send("Nice working");
});

// /meetings/details is to get the all meetings details
app.get("/meetings/details", async (req, res) => {
  const meets = await Meet.find({}); //will find all the meetings

  res.json({
    success: true,
    meets,
  });
});

// this is to add new meetings in the database
app.post("/meetings/new", async (req, res) => {
  const { summary, description, location, starteDateTime, endDateTime } =
    req.body;

  await Meet.create({
    summary,
    description,
    location,
    starteDateTime,
    endDateTime,
  });

  res.status(201).json({
    success: true,
    message: "New Meet added",
  });
});




app.listen(4000, () => {
  console.log("Server is running");
});
