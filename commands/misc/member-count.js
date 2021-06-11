const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'member-count',
	description: 'Display server member count',
	aliases: ['member-count', 'membercount'],
	usage: '',
	guildOnly: true,
	permissions: 'MANAGE_GUILD',
	async execute(message) {
		const guild = message.guild;

		const serverInfo_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(`🗃️ ${guild.name} server info`, guild.iconURL())
			.setThumbnail(guild.iconURL())
			.setDescription((!guild.description) ? `${guild.name} does not have any description.` : guild.description)
			.addFields(
				{ name: 'Total member count (bots included)', value: `${guild.name} **${guild.memberCount}** members` },
			);
		return message.channel.send(serverInfo_Embed);
	},
};