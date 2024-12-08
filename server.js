require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const errorMiddleware = require("./middleware/errorMiddleware");
const cors = require("cors");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND, // la seule url autorisée du frontend a accéder à l'api
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//middleware
// app.use(cors(corsOptions)); // corsOptions est un objet qui contient les options de cors
app.use(cors()); // si on veut autoriser toutes les urls

//middleware to parse json
app.use(express.json());

//middleware urlencoded
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/", (req, res) => {
  res.send("Hello World!");
  // throw new Error("test fake error");
});

app.use("/api/products", productRoute);
// app.use("/api/users", userRoute);

//error middleware
app.use(errorMiddleware);

//connect to mongo db
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to mongo db!");
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
