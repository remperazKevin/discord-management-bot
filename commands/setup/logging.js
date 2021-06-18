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
						const serverName = message.guild.name.split(' ').slice(0).join('_');
						const configParam = {
							webhookID: webhook.id,
							webhookToken: webhook.token,
							webhookGuildID: webhook.guildID,
						};
						// eslint-disable-next-line space-before-function-paren
						fs.mkdir(`./config/${serverName}`, function () {
							// eslint-disable-next-line max-nested-callbacks
							fs.writeFile(`./config/${serverName}/config_serverLogging.json`, JSON.stringify(configParam, null, 4), (err) => {
								if (err) return console.error(err);
								console.log(`./config/${serverName}/config_serverLogging.json has been created`);
							});
						});
					});
				});
			}
		});
	},
};