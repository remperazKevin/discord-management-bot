const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'roleDelete',
	on: true,
	async execute(role) {
		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = role.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (role.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							const clientBot = role.guild.client.user;

							const roleDelete = new MessageEmbed()
								.setColor('RED')
								.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
								.setDescription(`**Role deleted: \`${role.name}\`**`)
								.setTimestamp()
								.setFooter(`Role ID: ${role.id}`);
							return await webhookClient.send(roleDelete);
						}
					}
				}
			}
		}
	},
};