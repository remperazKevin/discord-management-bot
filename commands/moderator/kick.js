const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'kick',
	description: 'Kick a user',
	aliases: ['kick'],
	usage: '[user] [reason]',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t kick nothing', message.channel);

		const guild = message.guild;

		const member = message.mentions.members.first();
		if (!member) return embeds('arg', 'I can\'t kick an empty user', message.channel);

		const reason = args.slice(1).join(' ');
		if (!reason) return embeds('arg', `I can't kick ${member} without a reason.`, message.channel);

		const kickMessage = new MessageEmbed()
			.setColor('RED')
			.setAuthor(`⛔ You have been kicked from ${guild.name}`, guild.iconURL())
			.addField('Reason', `\`\`\`${reason}\`\`\``)
			.setTimestamp();

		return message.delete()
			.then(() => { return member.kick().then(() => { return member.send(kickMessage); }); })
			.catch(error => { return embeds('err', `There was an error kicking ${member}`, message.channel).then(() => { console.error(error); }); });
	},
};