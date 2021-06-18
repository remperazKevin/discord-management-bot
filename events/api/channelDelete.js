const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channelDelete',
	on: true,
	async execute(channel) {
		if (/.*log\s*([^\n\r]*)/gi.test(channel.name)) return;

		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = channel.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (channel.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							const clientBot = channel.guild.client.user;

							const channelDelete = new MessageEmbed()
								.setColor('RED')
								.setAuthor(clientBot.username, clientBot.displayAvatarURL({ dynamic: true }))
								.setDescription(`**Channel deleted: \`${channel.name}\`\nChannel Type: \`${channel.type}\`**`)
								.setTimestamp()
								.setFooter(`Channel ID: ${channel.id}`);
							return await webhookClient.send(channelDelete);
						}
					}
				}
			}
		}
	},
};