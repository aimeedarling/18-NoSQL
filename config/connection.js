const { connect, connection} = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB';

connect(connectionString)
// Export connection 
module.exports = connection;
