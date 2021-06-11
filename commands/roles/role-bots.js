require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-bots',
	description: 'Add/remove all bots to or from a role (Limit 1 role)',
	aliases: ['role-bots', 'rolebots'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const mentionedRole = message.mentions.roles.first();
		if (!mentionedRole) return embeds('arg', 'Please mention a `role`', message.channel);
		const guildRole = guild.roles.cache.find(role => role.name === mentionedRole.name);

		return guild.members.cache.forEach(guildMember => {
			if (!guildMember.user.bot) return;

			if (!guildMember.roles.cache.find(role => role.name === mentionedRole.name)) {
				return guild.members.fetch(guildMember.id).then(member => { member.roles.add(guildRole); })
					.then(() => { return message.inlineReply(`✅ Successfully added bot ${guildMember} to ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error adding bot ${guildMember} to ${guildRole}`, message.channel).then(() => { console.error(error); }); });
			}
			else {
				return guild.members.fetch(guildMember.id).then(member => { member.roles.remove(guildRole); })
					.then(() => { return message.inlineReply(`✅ Successfully removed bot ${guildMember} from ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error removing bot ${guildMember} from ${guildRole}`, message.channel).then(() => { console.error(error); }); });
			}
		});
	},
};