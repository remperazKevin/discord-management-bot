require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-move',
	description: 'Move all users to or from a role (Limit 1 role)',
	aliases: ['role-move', 'rolemove'],
	usage: '[old role] [new role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t move users in empty roles', message.channel);
		const guild = message.guild;

		const mentionedRoles = message.content.split(' ');
		const roles = mentionedRoles.slice(2).join(' ');
		if (roles.match(/(<@&\d+>)/gi) === null) return embeds('arg', 'Invalid arguments found', message.channel);
		const role = roles.match(/(\d+)/gi).toString();

		const oldRole = role.match(/^(\d+)/gi);
		if (oldRole.toString().match(/(838)/gi) === null) return embeds('arg', 'Invalid argument found `oldRole`', message.channel);
		if (!oldRole) return embeds('arg', 'Please mention a `role` to move users from', message.channel);
		const oldGuildRole = guild.roles.cache.find(r => r.id === oldRole.toString());

		const newRole = role.match(/(\d+)$/gi);
		if (!args[1]) return embeds('arg', 'Please mention a `role` to move users to', message.channel);
		if (newRole.toString().match(/(838)/gi) === null) return embeds('arg', 'Invalid argument found `newRole`', message.channel);
		const newGuildRole = guild.roles.cache.find(r => r.id === newRole.toString());

		if (oldRole.toString() === newRole.toString()) return embeds('arg', 'I can\'t move users in the same role', message.channel);

		return guild.members.cache.forEach(guildMember => {
			if (guildMember.user.bot) return;

			for (const memberRole of guildMember.roles.cache.sort((a, b) => b.position - a.position).map(r => r.id)) {
				if (memberRole === newGuildRole.id) return embeds('arg', `${guildMember} is already on ${newGuildRole}`, message.channel);
			}

			return guild.members.fetch(guildMember.id)
				.then(member => {
					member.roles.remove(oldGuildRole);
				})
				.then(() => {
					guild.members.fetch(guildMember.id)
						.then(member => {
							member.roles.add(newGuildRole);
						});
				})
				.then(() => { return message.inlineReply(`✅ Successfully moved ${guildMember} from ${oldGuildRole} to ${newGuildRole}`); })
				.catch(error => { return embeds('err', `There was an error moving ${guildMember} from ${oldGuildRole} to ${newGuildRole}`, message.channel).then(() => { console.error(error); }); });
		});
	},
};