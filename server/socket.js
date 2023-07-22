const { verifyToken } = require("./middleware/authorization_middleware");

let connection = null;
let sessionRestaurants = {};

// simple reusable class for order and delivery
// realtime notification
class SocketRealtime {
  constructor() {
    this._socket = null;
  }

  //connect to socket io server
  connect(server) {
    const { Server } = require("socket.io");

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });

    //listener for connection and other events
    io.on("connection", (socket) => {
      this._socket = socket;
      this._socket.on("statusConnetion", (data) => {
        console.log(data);
      });

      this._socket.on("Restaurant connected", (token) => {
        const restaurantId = verifyToken(token)._id;
        sessionRestaurants[restaurantId] = socket.id;
      });

      this._socket.on("disconnect", (socket) => {
        delete sessionRestaurants[socket.id];
        console.log(socket.id, "socket user disconnected");
      });

      console.log(`New socket connection: ${socket.id}`);
    });
  }

  // method for sending events
  sendEvent(event, data) {
    this._socket.emit(event, data);
  }

  // register an event
  registerEvent(event, handler) {
    this._socket.on(event, handler);
  }

  // send event to paricular user
  sendEventToSpecificUser(event, to, data) {
    this._socket.to(to).emit(event, data);
  }

  // initiate server connection
  static init(server) {
    if (!connection) {
      connection = new SocketRealtime();
      connection.connect(server);
    }
  }

  static getConnection() {
    if (!connection) {
      throw new Error("no active connection");
    }
    return connection;
  }
}

module.exports = {
  connect: SocketRealtime.init,
  connection: SocketRealtime.getConnection,
  sessionRestaurants: sessionRestaurants,
};
