const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'messageDeleteBulk',
	on: true,
	async execute(messages, guild) {
		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const guildName = messages.map(server => server.channel.guild.name)[0];
			const serverName = guildName.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (messages.map(srvr => srvr.channel.guild.id)[0] === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					const clientBot = guild.user;

					const channel_Name = messages.map(g => g.channel.name.slice(0));
					const channelName = guild.channels.cache.find(category => category.name === channel_Name[0]);

					let bulkDeleted_Messages = messages.map(msgs => `${msgs.author.username}: ${msgs.content}`).join('\n');
					if (bulkDeleted_Messages.length >= 1002) bulkDeleted_Messages = `${bulkDeleted_Messages.slice(0, 1000)}…`;

					const messageDelete_Error = new MessageEmbed()
						.setColor('ORANGE')
						.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
						.setDescription(`**\`${messages.size}\` messages have been bulk deleted in ${channelName}**`)
						.addField('\u200B', '```Embed value limit: 1024```')
						.setTimestamp();

					const messageDelete = new MessageEmbed()
						.setColor('ORANGE')
						.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
						.setDescription(`**\`${messages.size}\` messages have been bulk deleted in ${channelName}**`)
						.addField('\u200B', `\`\`\`${bulkDeleted_Messages}\`\`\``)
						.setTimestamp();

					if (messageDelete.length > 1024) return webhookClient.send('Too many deleted messages to log.', messageDelete_Error);

					return await webhookClient.send(messageDelete);
				}
			}
		}
	},
};