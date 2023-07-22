const mongoose = require('mongoose');

//Database connection
const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then(result => {
        console.log(`MongoDB connected with HOST: ${result.connection.host}`)
    }).catch(err => console.log("could not connect to MongoDB: ",err.message))
}

module.exports = connectToDatabase