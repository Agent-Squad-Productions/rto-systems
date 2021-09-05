/* eslint-disable prefer-const */
const Command = require('../../Structures/Command');
const errors = require('../../utils/errors.js');
const { channelID, adminRoles, ownerID } = require('../../../config.json');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['unmuteme'],
			description: 'Mute this bot.',
			category: 'Utility'
		});
	}

	// eslint-disable-next-line consistent-return
	async run(message) {
		if (!message.member.hasPermission('CONNECT')) return errors.noBotPerms(message, 'CONNECT');
		let hasNedeedRole = ['false'];
		let neededRole = [];
		adminRoles.forEach(element => {
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
		if (hasNedeedRole === 'true' || message.member.id === ownerID || message.member.hasPermission('ADMINISTRATOR')) {
			message.delete();
			const channel = this.client.channels.cache.get(channelID);
			if (!channel) return message.reply('The channel does not exist!');
			channel.guild.me.edit({ mute: false });
		} else {
			return errors.noPerms(message, neededRole);
		}
	}

};
