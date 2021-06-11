const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'roles',
	description: 'Dislay a list of server roles',
	aliases: ['roles'],
	usage: '(optional search)',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		if (!args.length) {
			message.guild.roles.fetch()
				.then(roles => {
					let roleList = roles.cache.sort((a, b) => b.position - a.position).map(role => role);

					if (roleList.length > 1024) return roleList = '⚠️ To many roles to display';
					if (!roleList) return roleList = '⚠️ No roles found';

					const roleList_Embed = new MessageEmbed()
						.setColor('GOLD')
						.setTitle(`🗃️ Role List [${roles.cache.size}]`)
						.setDescription(roleList.join('\n'));
					return message.channel.send(roleList_Embed);
				});
		}
		else {
			const searchedRole = message.mentions.roles;

			const searchedRole_Embed = new MessageEmbed()
				.setColor('GOLD')
				.setTitle(`🗃️ ${searchedRole.map(role => role.name)}`)
				.setDescription(`${searchedRole.first()}\n${message.guild.roles.everyone}`);
			return message.channel.send(searchedRole_Embed);
		}
	},
};