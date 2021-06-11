const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'role-info',
	description: 'Display info of a given role',
	aliases: ['role-info', 'roleinfo'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const searchedRole = message.mentions.roles;

		const searchedRole_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setThumbnail(await message.client.user.displayAvatarURL({ dynamic: true }))
			.setTitle(`🗃️ ${searchedRole.map(role => role.name)} Role info`)
			.addFields(
				{ name: 'ID', value: searchedRole.map(role => role.id), inline: true },
				{ name: 'Name', value: searchedRole.map(role => role.name), inline: true },
				{ name: 'Color', value: `${searchedRole.map(role => role.color)}`, inline: true },

				{ name: 'Mention', value: searchedRole.first(), inline: true },
				{ name: 'Hoisted', value: searchedRole.map(role => role.hoist), inline: true },
				{ name: 'Position', value: searchedRole.map(role => role.rawPosition), inline: true },

				{ name: 'Mentionable', value: searchedRole.map(role => role.mentionable), inline: true },
				{ name: 'Permissions', value: searchedRole.map(role => role.permissions.toArray().join('\n')) },
			)
			.setFooter(`Role Created • ${searchedRole.map(role => role.createdAt)}`);
		return message.channel.send(searchedRole_Embed);
	},
};