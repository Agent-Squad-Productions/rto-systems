const RTOBotClient = require('./Structures/RTOBotClient');
const config = require('../config.json');

const client = new RTOBotClient(config);
client.start();
