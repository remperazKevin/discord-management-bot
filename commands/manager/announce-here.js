const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'announce-here',
	description: 'Send an announcement with `@here`',
	aliases: ['announce-here', 'ann-here'],
	usage: '[channel] [message]',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;
		const clientBot = message.client.user;

		const channelMention = message.mentions.channels.first();
		if (!channelMention) return embeds('arg', 'Please mention a `channel`', message.channel);
		const channel = guild.channels.cache.get(channelMention.id);

		const messageArray = message.content.split(' ');
		const announcement = messageArray.slice(2);
		const announcementMessage = announcement.slice(1).join(' ');
		if (!announcementMessage) return embeds('arg', 'I can\'t announce an empty message', message.channel);

		const announcementEmbed = new MessageEmbed()
			.setColor('BLUE')
			.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }))
			.setTitle('📢 Server Announcement')
			.setDescription(announcementMessage)
			.setTimestamp();

		return channel.send('@here', announcementEmbed)
			.then(() => { return message.delete(); })
			.catch(error => { return embeds('err', 'There was an error announcing the message', message.channel).then(() => { console.error(error); }); });
	},
};