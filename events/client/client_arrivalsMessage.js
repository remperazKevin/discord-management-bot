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
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = `${member.guild.name.split(' ').slice(0).join('_')}_arrivals`;
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (member.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					return await webhookClient.send(welcomeMember);
				}
			}
		}
	},
};