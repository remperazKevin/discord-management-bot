require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'delete-mod',
	description: 'Delete a moderator(s) or mod role',
	aliases: ['delete-mod', 'del-mod', 'deletemod', 'delmod'],
	usage: '[role / user]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t delete an empty user(s) or role', message.channel);

		const guild = message.guild;
		const mentioned = message.mentions;
		const user = mentioned.users.first();
		const modRole = mentioned.roles.first();

		if (!user && !modRole) return embeds('arg', '`User(s)` or `Role` has already been deleted', message.channel);

		if (!modRole) {
			const member = guild.member(user);
			const user_Roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.name).join('\n');
			const userRoles = user_Roles;

			if (/.*mod\s*([^\n\r]*)/gi.test(userRoles)) {
				const modRole_Name = userRoles.match(/.*mod\s*([^\n\r]*)/gi).toString();
				const mod_Role = guild.roles.cache.find(role => role.name === modRole_Name);
				return guild.members.fetch(user.id).then(m => { m.roles.remove(mod_Role); })
					.then(() => { return message.inlineReply(`✅ Successfully deleted ${user} from ${mod_Role}`); })
					.catch(error => { return embeds('err', `There was an error deleting ${user} from ${mod_Role}`, message.channel).then(() => { console.error(error); }); });
			}
			else {
				return embeds('arg', `${user} does not have a mod role`, message.channel)
					.then(msg => msg.delete({ timeout: 3000 }));
			}
		}

		if (!user) {
			const role = message.guild.roles.cache.find(r => r.name === modRole.name);
			return role.delete(this.description)
				.then(() => { return message.inlineReply(`✅ Successfully deleted mod role: \`${modRole.name}\``); })
				.catch(error => { return embeds('err', `There was an error deleting mod role: \`${modRole.name}\``, message.channel).then(() => { console.error(error); }); });
		}
	},
};