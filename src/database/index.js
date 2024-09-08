const mongoose = require('mongoose');
const  logger = require('../logger');
mongoose.Promise = global.Promise;

async function connectToDatabase() {
    try {
        const host1 = "127.0.0.1";
        const password = "alter24S";
        const dbName = "qrCodes";
        const user = "alterSys"
        const connectionString = 'mongodb://localhost:27017/'
        await mongoose.connect(connectionString);
        logger.info(`Connected to database.`);
    } catch (error) {
        logger.error(error);
    }
}



module.exports = {
    connectToDatabase,
};
