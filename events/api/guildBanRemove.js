const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildBanRemove',
	on: true,
	async execute(guild, user) {
		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							const clientBot = guild.client.user;

							const banMember = new MessageEmbed()
								.setColor('ORANGE')
								.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
								.setDescription(`**⚠️ ${user} has been unbanned from the server**`)
								.setTimestamp();
							return await webhookClient.send(banMember);
						}
					}
				}
			}
		}
	},
};