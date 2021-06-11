const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channelCreate',
	on: true,
	async execute(channel) {
		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			if (channel.type === 'dm') return;
			const serverName = channel.guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (channel.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					const clientBot = channel.guild.client.user;

					const channelCreate = new MessageEmbed()
						.setColor('GREEN')
						.setAuthor(clientBot.username, clientBot.displayAvatarURL({ dynamic: true }))
						.setDescription(`**Channel created: \`${channel.name}\`\nChannel Type: \`${channel.type}\`**`)
						.setTimestamp()
						.setFooter(`Channel ID: ${channel.id}`);
					return await webhookClient.send(channelCreate);
				}
			}
		}
	},
};