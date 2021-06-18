const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'arrivals-setup',
	description: 'Setup arrival channel',
	aliases: ['arrivals-setup', 'arrivalssetup', 'arrival-setup', 'arrivalsetup'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const clientBot = message.client.user;
		message.channel.createWebhook(`${clientBot.username} Arrivals`, {
			avatar: clientBot.avatarURL({ format: 'png', size: 128 }),
			reason: 'Automatic webhook creation for arrivals',
		}).then(async webhook => {
			const embed = new MessageEmbed()
				.setColor('GREEN')
				.setAuthor(clientBot.username, clientBot.displayAvatarURL({ dynamic: true }))
				.setTitle(`Arrivals has been set in \`${message.channel.name}\``);

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
					fs.writeFile(`./config/${serverName}/config_serverArrivals.json`, JSON.stringify(configParam, null, 4), (err) => {
						if (err) return console.error(err);
						console.log(`./config/${serverName}/config_serverArrivals.json has been created`);
					});
				});
			});
		});
	},
};