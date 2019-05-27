require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL_TEST;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
module.exports = mongoose.connect(
    MONGO_URL,
    options,
);