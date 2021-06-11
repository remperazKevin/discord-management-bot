const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ban',
	description: 'Ban a violating user',
	aliases: ['ban'],
	usage: '[user] [reason]',
	guildOnly: true,
	permissions: 'BAN_MEMBERS',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t ban nothing', message.channel);

		const guild = message.guild;
		const user = message.mentions.users.first();
		if (!user) return embeds('arg', 'I can\'t ban an empty user', message.channel);

		const reason = args.slice(1).join(' ');
		if (!reason) return embeds('arg', `I can't ban ${user} without a reason.`, message.channel);

		const banMessage = new MessageEmbed()
			.setColor('RED')
			.setAuthor(`⛔ You have been banned from ${guild.name}`, guild.iconURL())
			.addField('Reason', `\`\`\`${reason}\`\`\``)
			.setTimestamp();

		return message.delete()
			.then(() => { return message.guild.members.ban(user, { reason }).then(() => { user.send(banMessage); }); })
			.catch(error => { return embeds('err', `There was an error banning ${user}`, message.channel).then(() => { console.error(error); }); });
	},
};