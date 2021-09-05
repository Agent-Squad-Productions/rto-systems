/* eslint-disable complexity */
const Event = require('../../Structures/Event');
const { channelID, webchannelID, inGameActivation, signal, panic, pager } = require('../../../config.json');
const fs = require('fs');

module.exports = class extends Event {

	async run(message) {
		if (message.guild === null) {
			return;
		}

		if (inGameActivation === 'true') {
			if (message.channel.id === webchannelID) {
				if (message.webhookID) {
					const connection = await this.client.channels.cache.get(channelID).join();
					if (message.content === `panic` && panic === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/panic.wav'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Panic Button sound successfully played to active LEOs in RTO.***`).then(msg => msg.delete({ timeout: 80000 }));
					}

					const page = message.content.substring(11, 6);
					if (page === 'fire' && pager === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/fire.ogg'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Successfully paged the Fire Team.***`);
					} else if (page === 'medic' && pager === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/medical.ogg'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Successfully paged the Medical Team.***`);
					} else if (page === 'rescu' && pager === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/rescue.ogg'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Successfully paged the Rescue Team.***`);
					} else if (page === 'end' && pager === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/end.ogg'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Successfully ended the pager.***`);
					}

					const singal = message.content.substring(11, 7);
					if (singal === '100' && signal === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/signal100.wav'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***Signal 100 sound successfully played to active LEOs in RTO.***`);
					} else if (singal === '99' && signal === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/panic.wav'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***10-99 sound successfully played to active LEOs in RTO.***`);
					} else if (singal === '3' && signal === 'on') {
						const dispatcher = connection.play(fs.createReadStream('Sounds/signal100.wav'));
						dispatcher.setVolume(1);
						dispatcher.on('error', console.error);
						message.channel.send(`***10-3 sound successfully played to active LEOs in RTO.***`);
					}
				}
			}
		}

		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is **\`${this.client.prefix}\`**.`);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

		if (!message.guild || message.author.bot) return;

		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			command.run(message, args);
		}
	}

};
