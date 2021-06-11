require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-add',
	description: 'Add role(s) to a user(s)',
	aliases: ['role-add', 'roleadd'],
	usage: '[user] [role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const user = message.mentions.users;
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);

		const mentionedRole = message.mentions.roles;
		if (!mentionedRole) return embeds('arg', 'Please mention a `role`', message.channel);

		return user.forEach(mentionedUser => {
			const member = guild.member(mentionedUser);
			return mentionedRole.forEach(guildRole => {
				if (member.roles.cache.find(role => role.name === guildRole.name)) return embeds('arg', `${user} is already in ${guildRole}`, message.channel);

				const userRole = guild.roles.cache.find(role => role.name === guildRole.name);

				return guild.members.fetch(member.id).then(msg => { msg.roles.add(userRole); })
					.then(() => { return message.inlineReply(`✅ Successfully added ${member} to ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error adding ${member} to ${guildRole}`, message.channel).then(() => { console.error(error); }); });
			});
		});
	},
};