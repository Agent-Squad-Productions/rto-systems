/* eslint-disable prefer-const */
const Command = require('../../Structures/Command');
const errors = require('../../utils/errors.js');
const fs = require('fs');
const { channelID, neededRoles, ownerID, signal, logchannelID, useLogs } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['sig', 'bk', '10'],
			description: 'Singal 100, BK 99, 10-3 Sound.',
			category: 'Tones',
			usage: '`100`, `99`, `3`'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (!message.guild.me.hasPermission('SPEAK')) return errors.noBotPerms(message, 'SPEAK');
		if (signal === 'on') {
			let hasNedeedRole = ['false'];
			let neededRole = [];
			neededRoles.forEach(element => {
				const foundRole = message.guild.roles.cache.find(rl => rl.id === element);
				const roleneeded = message.member.roles.cache.has(foundRole.id);
				if (roleneeded === true || message.member.id === ownerID || message.member.hasPermission('ADMINISTRATOR')) {
					const pos = hasNedeedRole.indexOf('false');
					hasNedeedRole.splice(pos, 1);
					hasNedeedRole.push('true');
				}
				if (roleneeded === false) {
					neededRole.push(foundRole.name);
				}
			});

			const logEmbed = new MessageEmbed()
				.setTitle('~Singal Sound Played~')
				.setColor('#df3a11')
				.addField('Excuted By', [
					`**❯ Username**: ${message.author.tag}`,
					`**❯ Discriminator:** ${message.author.discriminator}`,
					`**❯ ID:** ${message.member.id}`,
					`**❯ Mention:** ${message.member}`,
					`\u200b`
				])
				.addField('**❯ Excuted In**', message.channel)
				.setFooter('RTO System Logger')
				.setTimestamp();

			let activedSound = true;
			if (hasNedeedRole.includes('true')) {
				message.delete();
				const singal = args.join(' ');
				const connection = await this.client.channels.cache.get(channelID).join();
				if (singal === '100') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/signal100.wav'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Signal 100 sound successfully played to active LEOs in RTO.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (singal === '99') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/panic.wav'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***10-99 sound successfully played to active LEOs in RTO.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (singal === '3') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/signal100.wav'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***10-3 sound successfully played to active LEOs in RTO.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else {
					activedSound = false;
					return message.reply(`***Invalid Signal.*** | **Valid Signal:** \`\`100\`\`, \`\`99\`\`, \`\`3\`\``).then(msg => msg.delete({ timeout: 40000 }));
				}

				if (useLogs && activedSound === true) {
					const logChannel = message.guild.channels.cache.find(ch => ch.id === logchannelID);
					logChannel.send(logEmbed);
				}
			} else {
				return errors.noPerms(message, neededRole);
			}
		}
	}

};
