const { stripIndents } = require('common-tags');
const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'voiceStateUpdate',
	on: true,
	async execute(oldState, newState) {
		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = oldState.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (oldState.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
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
			}
		}
	},
};