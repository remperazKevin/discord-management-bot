const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'announce-role',
	description: 'Send an announcement with a role(s) mention',
	aliases: ['announce-role', 'ann-role', 'announce-roles', 'ann-roles'],
	usage: '[role] [channel] [message]',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;
		const clientBot = message.client.user;

		const messageContent = message.content.split(' ');
		const messageArray = messageContent.slice(2);
		let toMessage = 3;

		const messageRoles = messageArray.toString();
		const role_Format = /<@&?(\d+)>/gi;
		if (!messageRoles.match(role_Format)) return embeds('arg', 'Please mention a `role`', message.channel);
		// eslint-disable-next-line no-unused-vars
		for (const role of messageRoles.match(role_Format)) toMessage++;

		const channelMention = message.mentions.channels.first();
		if (!channelMention) return embeds('arg', 'Please mention a `channel`', message.channel);
		const channel = guild.channels.cache.get(channelMention.id);

		const announcementMessage = messageContent.slice(toMessage).join(' ');
		if (!announcementMessage) return embeds('arg', 'I can\'t announce an empty message', message.channel);

		const announcementEmbed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
			.setTitle('📢 Server Announcement')
			.setDescription(announcementMessage)
			.setTimestamp();

		return channel.send(`${messageRoles.match(role_Format).join(' • ')}`, announcementEmbed)
			.then(() => { return message.delete(); })
			.catch(error => { return embeds('err', 'There was an error announcing the message', message.channel).then(() => { console.error(error); }); });
	},
};