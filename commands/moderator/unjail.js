const embeds = require('../../util/embeds');

module.exports = {
	name: 'unjail',
	description: 'Release user from jail',
	aliases: ['unjail'],
	usage: '[user]',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const guild = message.guild;
		const roles = guild.roles;

		const everyone = roles.everyone;
		everyone.setPermissions(['VIEW_CHANNEL', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY']);

		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);

		const channels = guild.channels.cache;
		channels.forEach(channel => { channel.permissionOverwrites.find(overwrite => overwrite.type === 'member' && overwrite.id === user.id).delete(); });

		let jailChannelName;
		channels.forEach(channel => { if (/.*jail.*[^\n\r]*/gi.test(channel.name)) return jailChannelName = channel.name; });
		const channelJail = channels.find(category => category.name === jailChannelName);
		const jailChannel = channels.get(channelJail.id);
		jailChannel.permissionOverwrites.find(overwrite => overwrite.type === 'member' && overwrite.id === user.id).delete();
	},
};
