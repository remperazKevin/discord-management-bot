const embeds = require('../../util/embeds');

module.exports = {
	name: 'mute',
	description: 'Temporarily disable user permissions',
	aliases: ['mute'],
	usage: '[user] [length]',
	guildOnly: true,
	permissions: 'MUTE_MEMBERS',
	async execute(message, args) {
		const guild = message.guild;
		const guild_roles = guild.roles;
		guild_roles.everyone.setPermissions(['VIEW_CHANNEL', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'READ_MESSAGE_HISTORY']);

		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);
		const member = guild.member(user);
		if (!member.hasPermission('SEND_MESSAGES')) return embeds('arg', `${user} is already **muted** or _does not have a **role**_`, message.channel);

		const channels = guild.channels.cache;
		const user_roleRemoved = [];
		function unmute() {
			channels.forEach(channel => { channel.permissionOverwrites.find(overwrite => overwrite.type === 'member' && overwrite.id === user.id).delete(); });
			user.send(`❕  ${user}, you are now **unmuted** from \`${guild}\``);
			user_roleRemoved.forEach(guildRole => {
				const userRole = guild_roles.cache.find(role => role.id === guildRole);
				guild.members.fetch(user.id).then(m => { m.roles.add(userRole); });
			});
		}

		for (const [, channel] of channels) {
			channel.createOverwrite(user, { SEND_MESSAGES: false, ADD_REACTIONS: false });
		}

		member._roles.forEach(guildRole => {
			if (!guildRole) return;
			const userRole = guild_roles.cache.find(role => role.id === guildRole);
			guild.members.fetch(user.id).then(m => { m.roles.remove(userRole); });
			user_roleRemoved.push(userRole.id);
		});

		const timer = args[1];
		const timerConstant = 60000;
		const defaultTimer = 15 * timerConstant;

		if (!timer) {
			user.send(`⛔ ${user}, you are **muted** from \`${guild}\` for **15 minutes**`);
			message.channel.send(`✅ **Muted** ${user} for **15 minutes**`).then(msg => msg.delete({ timeout: defaultTimer }));
			return setTimeout(unmute, defaultTimer);
		}

		if (isNaN(timer)) return embeds('arg', 'Invalid argument: `supplied argument is not a number`', message.channel);

		if (timer < 15) {
			embeds('arg', 'Minimun mute length is **15 minutes**', message.channel);
			user.send(`⛔ ${user}, you are **muted** from \`${guild}\` for **15 minutes**`);
			message.channel.send(`✅ **Muted** ${user} for **15 minutes**`).then(msg => msg.delete({ timeout: defaultTimer }));
			return setTimeout(unmute, defaultTimer);
		}

		if (isFinite(timer)) {
			user.send(`⛔ ${user}, you are **muted** from \`${guild}\` for **${timer} minutes**`);
			message.channel.send(`✅ **Muted** ${user} for **${timer} minutes**`).then(msg => msg.delete({ timeout: timer * timerConstant }));
			return setTimeout(unmute, timer * timerConstant);
		}
	},
};
