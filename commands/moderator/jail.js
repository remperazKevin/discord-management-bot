const embeds = require('../../util/embeds');

module.exports = {
	name: 'jail',
	description: 'Put user to jail',
	aliases: ['jail'],
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

		const member = guild.member(user);
		member._roles.forEach(guildRole => {
			if (!guildRole) return;
			const userRole = roles.cache.find(role => role.id === guildRole);
			guild.members.fetch(user.id).then(m => { m.roles.remove(userRole); });
		});

		const channels = guild.channels;
		for (const [, channel] of channels.cache) {
			channel.createOverwrite(user, { SEND_MESSAGES: false, ADD_REACTIONS: false });
		}

		let jailChannelName;
		channels.cache.forEach(channel => { if (/.*jail.*[^\n\r]*/gi.test(channel.name)) return jailChannelName = channel.name; });
		const channelJail = channels.cache.find(category => category.name === jailChannelName);
		if (!channelJail) {
			return channels.create('jail', {
				type: 'text',
				topic: 'You may __reflect on your actions__ here. It is up to the **admin(s) decision** to *revoke* your jail sentence.',
				parent: message.channel.parentID,
				permissionOverwrites: [
					{
						id: everyone.id,
						deny: ['VIEW_CHANNEL'],
					},
				],
				reason: 'A place to put jailed users',
			}).then(channel => {
				channel.createOverwrite(user, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, VIEW_CHANNEL: true });
				channel.send(`⛔ ${user}, you are **jailed** for an *indefinite* amount of time`);
			});
		}
		const jailChannel = channels.cache.get(channelJail.id);
		jailChannel.createOverwrite(user, { SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, VIEW_CHANNEL: true });
		jailChannel.send(`⛔ ${user}, you are **jailed** for an *indefinite* amount of time`);
	},
};
