/* eslint-disable prefer-const */
const Command = require('../../Structures/Command');
const errors = require('../../utils/errors.js');
const fs = require('fs');
const { channelID, neededRoles, ownerID, pager, logchannelID, useLogs } = require('../../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['page'],
			description: 'Fire Rescue Pager.',
			category: 'Tones',
			usage: '`fire`, `medical`, `rescue`, `end`, `cancel`'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message, args) {
		if (!message.guild.me.hasPermission('SPEAK')) return errors.noBotPerms(message, 'SPEAK');
		if (pager === 'on') {
			let hasNedeedRole = ['false'];
			let neededRole = [];
			// eslint-disable-next-line no-undef
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
				.setTitle('~Pager Sound Played~')
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
				if (!message.guild.me.hasPermission('CONNECT')) return errors.noPerms(message, 'CONNECT');
				const page = args.join(' ');
				const connection = await this.client.channels.cache.get(channelID).join();
				if (page === 'fire') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/fire.ogg'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Successfully paged the Fire Team.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (page === 'medical') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/medical.ogg'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Successfully paged the Medical Team.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (page === 'rescue') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/rescue.ogg'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Successfully paged the Rescue Team.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (page === 'end') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/end.ogg'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Successfully ended the pager.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else if (page === 'cancel') {
					const dispatcher = connection.play(fs.createReadStream('Sounds/Fire/cancel.ogg'));
					dispatcher.setVolume(1);
					dispatcher.on('error', console.error);
					message.reply(`***Successfully canceled the pager.***`).then(msg => msg.delete({ timeout: 80000 }));
				} else {
					activedSound = false;
					return message.reply(`***Invalid Pager.*** | **Valid Pagers:** \`\`fire\`\`, \`\`medical\`\`, \`\`rescue\`\`, \`\`end\`\`, \`\`cancel\`\``).then(msg => msg.delete({ timeout: 40000 }));
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
