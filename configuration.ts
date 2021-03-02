let MONGODB_URI: string;

let MONGODB_USER
let MONGODB_PASSWORD
let MONGODB_DB_NAME
let APP_SECRET: string

try {
    let config = require('./config.json');

    MONGODB_USER = config.MONGODB_USER;
    MONGODB_PASSWORD = config.MONGODB_PASSWORD;
    MONGODB_DB_NAME  = config.MONGODB_DB_NAME;
    APP_SECRET = config.APP_SECRET;
} catch (error) {
    MONGODB_USER = process.env.MONGODB_USER;
    MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
    MONGODB_DB_NAME = process.env.MONGODB_PASSWORD;
    APP_SECRET = process.env.APP_SECRET!;
}

MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@merkkikauppacluster.qhkq5.mongodb.net/${MONGODB_DB_NAME}?retryWrites=true&w=majority`;

export { MONGODB_URI, APP_SECRET};