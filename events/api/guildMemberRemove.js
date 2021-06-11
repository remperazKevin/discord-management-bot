const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	on: true,
	async execute(member) {
		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = member.guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (member.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					const clientBot = member.guild.client.user;

					const leftMember = new MessageEmbed()
						.setColor('RED')
						.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
						.setDescription(`${member} **has left the server**`)
						.addField('Roles:', member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join('\n'))
						.setTimestamp()
						.setFooter(`User ID: ${member.id}`);

					return await webhookClient.send(leftMember);
				}
			}
		}
	},
};