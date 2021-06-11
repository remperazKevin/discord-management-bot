require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role',
	description: 'Add/remove role(s) from a user',
	aliases: ['role'],
	usage: '[user] [role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);
		const member = guild.member(user);

		const mentionedRole = message.mentions.roles;
		if (!mentionedRole) return embeds('arg', 'Please mention a `role`', message.channel);

		return mentionedRole.forEach(guildRole => {
			const userRole = guild.roles.cache.find(role => role.name === guildRole.name);

			if (!member.roles.cache.find(role => role.name === guildRole.name)) {
				return guild.members.fetch(user.id).then(m => { m.roles.add(userRole); })
					.then(() => { return message.inlineReply(`✅ Successfully added ${user} to ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error addning ${user} to ${guildRole}`, message.channel).then(() => { console.error(error); }); });

			}
			else {
				return guild.members.fetch(user.id).then(m => { m.roles.remove(userRole); })
					.then(() => { return message.inlineReply(`✅ Successfully removed ${user} from ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error removing ${user} from ${guildRole}`, message.channel).then(() => { console.error(error); }); });

			}
		});
	},
};