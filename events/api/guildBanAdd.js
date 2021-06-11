const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildBanAdd',
	on: true,
	async execute(guild, user) {
		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					const clientBot = guild.client.user;

					const banMember = new MessageEmbed()
						.setColor('RED')
						.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
						.setDescription(`⛔ **${user} has been banned from the server**`)
						.setTimestamp()
						.setFooter(`User ID: ${user.id}`);
					return await webhookClient.send(banMember);
				}
			}
		}
	},
};