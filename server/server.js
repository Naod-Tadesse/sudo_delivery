const dotenv = require("dotenv");
const server = require("./app");
const connectToDatabase = require("./config/database");

//set up configuration
dotenv.config({ path: "./config/config.env" });

connectToDatabase();

server.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
