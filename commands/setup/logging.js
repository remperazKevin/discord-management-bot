const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'logging-setup',
	description: 'Setup logging channel',
	aliases: ['logging-setup', 'logggingsetup', 'logs-setup', 'logssetup', 'log-setup', 'logsetup'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;
		const channels = guild.channels.cache;
		channels.forEach(channel => {
			if (/.*log\s*([^\n\r]*)/gi.test(channel.name)) {
				const loggingChannel = guild.channels.cache.find(category => category.name === channel.name);
				const clientBot = message.client.user;
				loggingChannel.createWebhook(`${clientBot.username} Server Logging`, {
					avatar: clientBot.avatarURL({ format: 'png', size: 128 }),
					reason: 'Automatic webhook creation for server logging',
				}).then(async webhook => {
					const embed = new MessageEmbed()
						.setColor('GREEN')
						.setAuthor(clientBot.username, clientBot.displayAvatarURL({ dynamic: true }))
						.setTitle('✅ Logging has been set');

					await webhook.send(embed).then(() => {
						const fs = require('fs');
						const server_FileName = message.guild.name.split(' ').slice(0).join('_');
						const serverProperties = {
							serverLogging: true,
							webhookID: webhook.id,
							webhookToken: webhook.token,
							webhookGuildID: webhook.guildID,
						};
						fs.writeFile(`./config/${server_FileName}.json`, JSON.stringify(serverProperties, null, 4), (err) => {
							if (err) return console.error(err);
							console.log(`${server_FileName}.json has been created`);
						});
					});
				});
			}
		});
	},
};