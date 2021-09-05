const Event = require('../../Structures/Event');
const { channelID } = require('../../../config.json');
const fs = require('fs');
// eslint-disable-next-line no-unused-vars

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	// eslint-disable-next-line consistent-return
	async run() {
		console.log([
			`Bot Started`,
			`Logged in as ${this.client.user.tag}`,
			`Loaded ${this.client.commands.size} commands!`,
			`Loaded ${this.client.events.size} events!`
		].join('\n'));

		const activities = [
			`over RTO.`,
			`me make mic clicks.`,
			`the server grow!`
		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 10000);

		const channel = this.client.channels.cache.get(channelID);
		if (!channel) return console.error('The channel does not exist!');
		channel.join().then(connection => {
			console.log(`Successfully connected. (Start Up)`);
			const dispatcher = connection.play(fs.createReadStream('Sounds/jointone.mp3'));
			dispatcher.setVolume(0.2);
		// eslint-disable-next-line id-length
		}).catch(e => {
			console.error(e);
		});
	}

};
