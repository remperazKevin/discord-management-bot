const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	on: true,
	async execute(member) {
		const clientBot = member.guild.client.user;
		const newMember = new MessageEmbed()
			.setColor('GREEN')
			.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
			.setDescription(`${member} **has joined the server**`)
			.addField('Join Date:', `${member.joinedAt}`)
			.setTimestamp()
			.setFooter(`User ID: ${member.id}`);

		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = member.guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (member.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					return await webhookClient.send(newMember);
				}
			}
		}
	},
};