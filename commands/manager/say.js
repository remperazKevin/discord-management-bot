const embeds = require('../../util/embeds');
module.exports = {
	name: 'say',
	description: 'Make the bot say a message',
	aliases: ['say'],
	usage: '[channel] [message]',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;

		const channelMention = message.mentions.channels.first();
		if (!channelMention) return embeds('arg', 'Please mention a `channel`', message.channel);
		const channel = guild.channels.cache.get(channelMention.id);

		const messageArray = message.content.split(' ');
		const msg = messageArray.slice(2);
		const text = msg.slice(1).join(' ');
		if (!text) return embeds('arg', 'Please supply a message to say', message.channel);
		return channel.send(text).then(() => { message.delete(); });
	},
};