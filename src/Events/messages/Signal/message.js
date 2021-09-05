/* eslint-disable max-depth */
const Event = require('../../../Structures/Event');
const fs = require('fs');
const { channelID, webchannelID, inGameActivation, signal } = require('../../../../config.json');

module.exports = class extends Event {

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (inGameActivation === 'true') {
			if (signal === 'on') {
				if (message.channel.id === webchannelID) {
					if (message.webhookID) {
						
					}
				}
			}
		}
	}

};
