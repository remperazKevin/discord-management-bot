require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'set-nick',
	description: 'Change user nickname',
	aliases: ['set-nick', 'setnick'],
	usage: '[user] [nickname]',
	guildOnly: true,
	permissions: 'MANAGE_NICKNAMES',
	async execute(message) {
		const user = message.mentions.users.first();
		if (!user) return embeds('arg', '⚠️ Please mention a `user`', message.channel);
		const member = message.guild.member(user);

		const messageArray = message.content.split(' ');
		const userNick = messageArray.slice(2);
		const nickname = userNick.slice(1).join(' ');
		if (!nickname) return embeds('arg', `I can't change ${user} to an empty nickname`, message.channel);

		return member.setNickname(nickname, this.description)
			.then(() => { return message.inlineReply(`✅ Successfully changed ${user} nickname to: \`${nickname}\``).then(msg => msg.delete({ timeout: 3000 })); })
			.catch(error => { return embeds('err', `There was an error changing nickname of ${user}`, message.channel).then(() => { console.error(error); }); });
	},
};