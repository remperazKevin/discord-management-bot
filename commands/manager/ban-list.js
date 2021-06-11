require('../../util/inlineReply');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban-list',
	description: 'List all banned members',
	aliases: ['ban-list', 'banlist', 'banned-members', 'banned'],
	usage: '',
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	async execute(message) {
		const guild = message.guild;

		return guild.fetchBans()
			.then(banned => {
				let bannedList = banned.map(member => `${member.user.tag} | Reason: \`${member.reason}\``).join('\n');

				if (bannedList.length >= 1002) bannedList = `${bannedList.slice(0, 1000)}...`;

				const banList = new MessageEmbed()
					.setColor('GOLD')
					.setAuthor(`🗃️ Banned Members on ${guild.name}`, guild.iconURL())
					.addField((banned.size === 1) ? `**\`${banned.size}\` User is banned:**` : `**\`${banned.size}\` Users are banned:**`, `>>> ${bannedList}`);
				return message.inlineReply(banList);
			});
	},
};