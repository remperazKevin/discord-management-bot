const { stripIndents } = require('common-tags');
const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'voiceStateUpdate',
	on: true,
	async execute(oldState, newState) {
		const fs = require('fs');
		const server_configFiles = fs.readdirSync('./config/').filter(file => file.endsWith('.json'));
		for (const serverConfig of server_configFiles) {
			const serverName = oldState.guild.name.split(' ').slice(0).join('_');
			const serverFile = serverConfig.split('.')[0];
			const server = require(`../../config/${serverConfig}`);
			if (serverFile === serverName) {
				if (oldState.guild.id === server.webhookGuildID) {
					const webhookClient = new WebhookClient(server.webhookID, server.webhookToken);
					const clientBot = oldState.guild.client.user;

					if (oldState.channel === null) {
						const voiceState = new MessageEmbed()
							.setColor('GREEN')
							.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
							.setDescription(`**Member: ${oldState.member.user}\nJoined Voice Channel: ${newState.channel}**`)
							.setTimestamp()
							.setFooter(stripIndents`User ID: ${oldState.member.user.id}
                            Voice Channel ID: ${newState.channelID}
                            Session ID: ${newState.sessionID}`);
						return await webhookClient.send(voiceState);
					}
					if (newState.channel === null) {
						const voiceState = new MessageEmbed()
							.setColor('RED')
							.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
							.setDescription(`**Member: ${oldState.member.user}\nLeft Voice Channel: ${oldState.channel}**`)
							.setTimestamp()
							.setFooter(stripIndents`User ID: ${oldState.member.user.id}
                        Voice Channel ID: ${oldState.channelID}
                        Session ID: ${oldState.sessionID}`);
						return await webhookClient.send(voiceState);
					}
					if (oldState.channel !== null && newState.channel !== null) {
						const voiceState = new MessageEmbed()
							.setColor('ORANGE')
							.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
							.setDescription(`**Member: ${oldState.member.user}\nMoved Voice Channels: ${oldState.channel} -> ${newState.channel}**`)
							.setTimestamp()
							.setFooter(stripIndents`User ID: ${oldState.member.user.id}
                            Old Voice Channel ID: ${oldState.channelID}
                            New Voice Channel ID: ${newState.channelID}
                            Session ID: ${newState.sessionID}`);
						return await webhookClient.send(voiceState);
					}
				}
			}
		}
	},
};