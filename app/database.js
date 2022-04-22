//~import pg module
const { Client } = require('pg');

//~create new client
const client = new Client();

//~connect client
client.connect();

//~export client
module.exports = client;