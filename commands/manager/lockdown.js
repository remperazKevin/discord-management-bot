const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'lockdown',
	description: 'Lock channel from everyone',
	aliases: ['lockdown'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;
		const guildChannels = guild.channels.cache;
		const mentionedRole = message.mentions.roles.first();
		if (!mentionedRole) return embeds('arg', 'Please mention the `member role`', message.channel);

		let announcement_ChannelName;
		guildChannels.forEach(channel => {
			if ((/.*announcement\s*([^\n\r]*)/gi.test(channel.name))) return announcement_ChannelName = channel.name;
		});

		const announcement_Channel = guildChannels.find(category => category.name === announcement_ChannelName);
		if (!announcement_Channel) return embeds('arg', 'I can\'t find any `Announcement` channel', message.channel);
		const announcementChannel = guildChannels.get(announcement_Channel.id);

		const lockdownChannel = guildChannels.get(message.channel.id).toString();
		const members = guild.roles.cache.find(role => role.name === mentionedRole.name);

		message.channel.updateOverwrite(members, { SEND_MESSAGES: false });
		const channelLockdown = new MessageEmbed()
			.setColor('RED')
			.setAuthor('⚠️ Channel Lockdown', guild.iconURL())
			.setDescription(`Channel ${lockdownChannel} under 🔒 **Lockdown** and is ⛔ **Quarantined**`);

		return message.delete().then(() => { announcementChannel.send('@everyone', channelLockdown); });
	},
};