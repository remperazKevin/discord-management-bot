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
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = member.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (member.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							await webhookClient.send(newMember);
							return member.setNickname('Unverified');
						}
					}
				}
			}
		}
	},
};