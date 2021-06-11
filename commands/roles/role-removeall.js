require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-removeall',
	description: 'Remove all roles of a user',
	aliases: ['role-removeall', 'roleremoveall'],
	usage: '[user]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;

		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);
		const member = guild.member(user);

		return member._roles.forEach(guildRole => {
			const userRole = guild.roles.cache.find(role => role.id === guildRole);

			return guild.members.fetch(user.id).then(m => { m.roles.remove(userRole); })
				.then(() => { return message.inlineReply(`✅ Successfully removed ${userRole} from ${user}`); })
				.catch(error => { return embeds('err', `There was an error removing ${userRole} from ${user}`, message.channel).then(() => { console.error(error); }); });
		});
	},
};