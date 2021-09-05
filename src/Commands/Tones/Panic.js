/* eslint-disable prefer-const */
const Command = require('../../Structures/Command');
const errors = require('../../utils/errors.js');
const fs = require('fs');
const { channelID, neededRoles, ownerID, panic, logchannelID, useLogs } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Police Panic Button Sound.',
			category: 'Tones'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (!message.guild.me.hasPermission('SPEAK')) return errors.noBotPerms(message, 'SPEAK');
		if (panic === 'on') {
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
				.setTitle('~Panic Button Sound Played~')
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

			if (hasNedeedRole.includes('true')) {
				message.delete();
				const connection = await this.client.channels.cache.get(channelID).join();
				const dispatcher = connection.play(fs.createReadStream('Sounds/panic.wav'));
				dispatcher.setVolume(1);
				dispatcher.on('error', console.error);
				message.reply(`***Panic Button sound successfully played to active LEOs in RTO.***`).then(msg => msg.delete({ timeout: 80000 }));
				if (useLogs) {
					const logChannel = message.guild.channels.cache.find(ch => ch.id === logchannelID);
					logChannel.send(logEmbed);
				}
			} else {
				return errors.noPerms(message, neededRole);
			}
		}
	}

};
