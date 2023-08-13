

// 18: 27
// Sample connection string for connecting on Heroku OR locally, just remember to swap out the database name in the local string:
// connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/commentExample');


//! Laura pseudo code
//need seed data ->either JS object or JSON file
//require in your models
//require the seed data into the seed file//connect to the database
    //? connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/commentExample');
//drop the relevant collections
//create the parent collections (Users)
//if you have related data, iterate over the data (thoughts) and for each generate a random number * the length of the user array
//find the user at that index
//insert that user's_id or username into that thought doc
//find and update the user whose _id or username was just inserted as the creator of the though

//End the seed process with process.exit(0)

//call the seed process
//? dont need to seed reactions

//user.deleteMany({}).then

const {Reaction, Thought, User} = require()