require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-all',
	description: 'Add/remove all users from a role (Limit 1 role)',
	aliases: ['role-all', 'roleall'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const mentionedRole = message.mentions.roles.first();
		if (!mentionedRole) return embeds('arg', 'Please mention a `role`', message.channel);
		const guildRole = guild.roles.cache.find(role => role.name === mentionedRole.name);

		return guildRole.members.forEach(removeUser => {
			return guild.members.fetch(removeUser.id).then(member => { member.roles.remove(guildRole); })
				.then(() => { return message.inlineReply(`✅ Successfully removed ${removeUser} from ${guildRole}`); })
				.catch(error => { return embeds('err', `There was an error removing ${removeUser} from ${guildRole}`, message.channel).then(() => { console.error(error); }); });
		});
	},
};