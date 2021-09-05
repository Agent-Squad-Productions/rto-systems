const Event = require('../../Structures/Event');
const { channelID, muteTimer, muteMode, micClicks } = require('../../../config.json');
const fs = require('fs');

module.exports = class extends Event {

	// eslint-disable-next-line consistent-return
	async run(member, speaking) {
		const channel = this.client.channels.cache.get(channelID);
		if (!channel) return console.error('The channel does not exist!');
		const fistSpeaker = member;
		channel.members.forEach(person => {
			if (person.user.bot) {
				return;
			}
			if (muteMode === 'on') {
				if (speaking) {
					if (person !== fistSpeaker) {
						person.voice.setMute(true);
						setTimeout(() => {
							person.voice.setMute(false);
						}, muteTimer * 1000);
					}
				}
			}
			if (micClicks === 'on') {
				if (speaking) {
					channel.join().then(connection => {
						const dispatcher = connection.play(fs.createReadStream('Sounds/mic_click_off.wav'));
						dispatcher.setVolume(0.2);
						// eslint-disable-next-line id-length
					}).catch(e => {
						console.error(e);
					});
				}
			}
		});
	}

};
