const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async () => {
    try{
        await mongoose.connect(db);
        
        console.log('Connected to Mongo DB');
    }
    catch(err){
        console.error(`Unable to connect Mongo DB ${err.message}`);
        process.exit(1);
    }
    
};

module.exports = connectDB;