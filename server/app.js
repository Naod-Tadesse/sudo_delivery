// third party modules
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const server = http.createServer(app);
const morgan = require("morgan");
const cors = require("cors");

// custom modules
const socketRealtime = require("./socket");
const config = require("config");
const customEnv = require("./config/custom-environment-variables.json");
const users_route = require("./routes/users_route");
const restaurants_route = require("./routes/restaurants_route");
const foods_route = require("./routes/foods_route");
const profiles_route = require("./routes/profiles_route");
const order_route = require("./routes/order_route");

//initiate socket connection with server
socketRealtime.connect(server);

//checking if env variables present
for (item in customEnv) {
  if (!config.get(item)) {
    console.log(`FATAL ERROR: ${item} is not defined.`);
    process.exit(1);
  }
}

const corsOptions = {
  origin: 'https://sudo-delivery-1r5t.vercel.app',
  exposedHeaders: ["x-auth-token"]
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.get("/", (req, res) => {
  res.send("hello")
})
app.use("/api", foods_route);
app.use("/api/users", users_route);
app.use("/api/users", order_route);
app.use("/api/auth", users_route);
app.use("/api/restaurants", restaurants_route);
app.use("/api/restaurants", order_route);
app.use("/api/auth", restaurants_route);
app.use("/api", profiles_route);

//static files
app.use("/api", express.static("storage"));
exports.app = app;
module.exports = server;
