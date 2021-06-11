const embeds = require('../../util/embeds');

module.exports = {
	name: 'afk',
	description: 'Set [ AFK ] status',
	aliases: ['afk'],
	usage: '',
	guildOnly: true,
	permissions: 'CHANGE_NICKNAME',
	async execute(message) {
		const user = message.author;
		const member = message.guild.member(user);

		const afkMember = `${user.username} [ AFK ]`;
		if (!member.nickname) {
			message.delete();
			return member.setNickname(afkMember, this.description)
				.catch(error => { return embeds('err', `There was an error removing afk status of ${user}`, message.channel).then(() => { console.error(error); }); });
		}

		message.delete();
		return member.setNickname(user.username)
			.catch(error => { return embeds('err', `There was an error removing afk status of ${user}`, message.channel).then(() => { console.error(error); }); });
	},
};