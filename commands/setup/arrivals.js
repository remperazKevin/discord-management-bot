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
				const server_FileName = message.guild.name.split(' ').slice(0).join('_');
				const serverProperties = {
					serverArrivals: true,
					webhookID: webhook.id,
					webhookToken: webhook.token,
					webhookGuildID: webhook.guildID,
				};
				fs.writeFile(`./config/${server_FileName}_arrivals.json`, JSON.stringify(serverProperties, null, 4), (err) => {
					if (err) return console.error(err);
					console.log(`${server_FileName}_arrivals.json has been created`);
				});
			});
		});
	},
};