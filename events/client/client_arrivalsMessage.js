const { MessageEmbed, WebhookClient } = require('discord.js');

const welcomeMessages = ['Welcome', 'Welcome enjoy your stay!', 'Welcome! Have fun!'];

module.exports = {
	name: 'guildMemberAdd',
	on: true,
	async execute(member) {
		const welcomeMember = new MessageEmbed()
			.setColor('LUMINOUS_VIVID_PINK')
			.setTitle(`**Welcome to ${member.guild.name}**`)
			.setDescription(`**${welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}** ${member}`)
			.setTimestamp();

		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = member.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverArrivals') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (member.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							return await webhookClient.send(welcomeMember);
						}
					}
				}
			}
		}
	},
};