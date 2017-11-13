require('dotenv').config();

const config = {
 PG_CONNECTION_STRING: process.env.PG_CONNECTION_STRING
};

module.exports = config;
