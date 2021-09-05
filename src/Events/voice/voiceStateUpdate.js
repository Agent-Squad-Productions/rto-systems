const Event = require('../../Structures/Event');
const { channelID } = require('../../../config.json');
const fs = require('fs');

module.exports = class extends Event {

	// eslint-disable-next-line consistent-return
	async run(oldMember, newMember) {
		const newUserChannel = newMember.channelID;

		if (newUserChannel !== channelID) {
			if (oldMember.id === this.client.user.id) {
				const channel = this.client.channels.cache.get(channelID);
				if (!channel) return console.error('The channel does not exist!');
				channel.join().then(connection => {
					console.log(`Successfully connected. (After Disconnect)`);
					const dispatcher = connection.play(fs.createReadStream('Sounds/jointone.mp3'));
					dispatcher.setVolume(0.2);
				// eslint-disable-next-line id-length
				}).catch(e => {
					console.error(e);
				});
			}
		}
	}

};
