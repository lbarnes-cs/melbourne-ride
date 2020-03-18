require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3005;
const {
  supporters,
  faqs,
  event,
  history,
  aims,
  facts
} = require("../website.json");

app.use(cors());

app.get("/faqs", (req, res) => {
  return res.json(faqs);
});

app.get("/supporters", (req, res) => {
  return res.json(supporters);
});

app.get("/history", (req, res) => {
  return res.json(history);
});

app.get("/event", (req, res) => {
  return res.json(event);
});

app.get("/aims", (req, res) => {
  return res.json(aims);
});
app.get("/facts", (req, res) => {
  return res.json(facts);
});

app.post("/subscribe", (req, res) => {
  return res.send("Received a POST HTTP method");
});

app.listen(PORT, () =>
  console.log(`Demo server listening on port ${PORT}!`, process.env.PORT)
);
