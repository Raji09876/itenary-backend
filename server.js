require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const db = require("./app/models");

db.sequelize.sync();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.options("*", cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Travel Itenary backend." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/itinerary.routes")(app);
require("./app/routes/place.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/booking.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3200;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
