require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-humans',
	description: 'Add/remove all users to or from a role (Limit 1 role)',
	aliases: ['role-humans', 'rolehumans'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const mentionedRole = message.mentions.roles.first();
		if (!mentionedRole) return embeds('arg', 'Please mention a `role`', message.channel);
		const guildRole = guild.roles.cache.find(role => role.name === mentionedRole.name);

		return guild.members.cache.forEach(guildMember => {
			if (guildMember.user.bot) return;

			if (!guildMember.roles.cache.find(role => role.name === mentionedRole.name)) {
				return guild.members.fetch(guildMember.id).then(member => { member.roles.add(guildRole); })
					.then(() => { return message.inlineReply(`✅ Successfully added ${guildMember} to ${guildRole}`); })
					.catch(error => { return embeds('err', `There was an error adding ${guildMember} to ${guildRole}`, message.channel).then(() => { console.error(error); }); });
			}

			return guild.members.fetch(guildMember.id).then(member => { member.roles.remove(guildRole); })
				.then(() => { return message.inlineReply(`✅ Successfully removed ${guildMember} from ${guildRole}`); })
				.catch(error => { return embeds('err', `There was an error removing ${guildMember} from ${guildRole}`, message.channel).then(() => { console.error(error); }); });
		});
	},
};