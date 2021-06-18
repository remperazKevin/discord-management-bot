const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildMemberRemove',
	on: true,
	async execute(member) {
		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = member.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (member.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
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
			}
		}
	},
};