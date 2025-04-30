const express = require("express");
const urlRoutes = require("./routes/url");
const connectToMongoDB = require("./connect");
const URL = require("./models/url");
const { getAnalytics } = require("./controller/url");
const app = express();
const PORT = 8000;

connectToMongoDB("mongodb://localhost:27017/short-url") // short-url is a database name
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(`Error connecting DB : ${err}`));

app.use(express.json());

app.use("/url", urlRoutes);

app.get('/', (req, res) => {
    res.send("URL Shortner")
})

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry?.redirectedURL);
});

app.get('/analytics/:shortId', getAnalytics)



app.listen(PORT, () => {
  console.log(`Server started at the port : ${PORT}`);
});
