const { stripIndents } = require('common-tags');
const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
	name: 'guildMemberUpdate',
	on: true,
	async execute(oldMember, newMember) {
		const fs = require('fs');
		const server_configFolders = fs.readdirSync('./config');
		for (const folder of server_configFolders) {
			const serverName = oldMember.guild.name.split(' ').slice(0).join('_');
			if (folder === serverName) {
				const server_configFiles = fs.readdirSync(`./config/${folder}`).filter(file => file.endsWith('.json'));
				for (const file of server_configFiles) {
					const config_File = file.split('.')[0];
					if (config_File === 'config_serverLogging') {
						const serverConfig = require(`../../config/${folder}/${file}`);
						if (oldMember.guild.id === serverConfig.webhookGuildID) {
							const webhookClient = new WebhookClient(serverConfig.webhookID, serverConfig.webhookToken);
							const clientBot = oldMember.guild.client.user;

							const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
							if (addedRoles.size > 0) {
								const roleAdd = new MessageEmbed()
									.setColor('GREEN')
									.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
									.setDescription(`**<@${oldMember.id}> was given the \`${addedRoles.map(role => role.name)}\` role**`)
									.setTimestamp()
									.setFooter(stripIndents`User ID: ${oldMember.id}
                            Role ID: ${addedRoles.map(role => role.id)}
                            Guild ID: ${oldMember.guild.id}`);
								return await webhookClient.send(roleAdd);
							}
							const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
							if (removedRoles.size > 0) {
								const roleRemove = new MessageEmbed()
									.setColor('RED')
									.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
									.setDescription(`**<@${oldMember.id}> was removed from the \`${removedRoles.map(role => role.name)}\` role**`)
									.setTimestamp()
									.setFooter(stripIndents`User ID: ${oldMember.id}
                            Role ID: ${removedRoles.map(role => role.id)}
                            Guild ID: ${oldMember.guild.id}`);
								return await webhookClient.send(roleRemove);
							}

							if (oldMember.nickname !== newMember.nickname) {
								let userNicknameOld;
								if (oldMember.nickname === null) { userNicknameOld = 'None'; }
								else { userNicknameOld = oldMember.nickname; }
								let userNicknameNew;
								if (newMember.nickname === null) { userNicknameNew = 'None'; }
								else { userNicknameNew = newMember.nickname; }

								const changedNick = new MessageEmbed()
									.setColor('ORANGE')
									.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
									.setDescription(`**<@${oldMember.id}> nickname changed**`)
									.addFields(
										{ name: 'Before', value: userNicknameOld },
										{ name: 'After', value: userNicknameNew },
									)
									.setTimestamp()
									.setFooter(stripIndents`User ID: ${oldMember.id}
                            Guild ID: ${oldMember.guild.id}`);
								return await webhookClient.send(changedNick);
							}
						}
					}
				}
			}
		}
	},
};