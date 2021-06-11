require('../../util/inlineReply');
const embeds = require('../../util/embeds');
module.exports = {
	name: 'del-nick',
	description: 'Change user nickname',
	aliases: ['del-nick', 'delnick', 'delete-nick', 'deletenick'],
	usage: '[user] [nickname]',
	guildOnly: true,
	permissions: 'MANAGE_NICKNAMES',
	async execute(message) {
		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'Please mention a `user`', message.channel);
		const member = message.guild.member(user);
		return member.setNickname(user.username, this.description)
			.then(() => { return message.inlineReply(`✅ Successfully removed nickname of ${user}`).then(msg => msg.delete({ timeout: 3000 })); })
			.catch(error => { return embeds('arg', `There was an error removing nickname of ${user}`, message.channel).then(() => { console.error(error); }); });
	},
};