const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channelDelete',
	on: true,
	async execute(channel) {
		if (/.*log\s*([^\n\r]*)/gi.test(channel.name)) return;

		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = channel.guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (channel.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
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
	},
};