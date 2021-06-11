const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'message',
	on: true,
	async execute(message) {
		if (message.author.bot) return;

		const user = message.mentions.users.first();
		if (!user) return;
		if (message.author.id === user.id) return;

		const member = message.guild.member(user);
		if (!member.nickname) return;

		if (member.nickname.includes('[ AFK ]')) {
			const afkEmbed = new MessageEmbed()
				.setColor('GOLD')
				.setAuthor('AFK Message Log')
				.setDescription(`${message.author} pinged you`)
				.addField('Message Content', `${message.content}`)
				.setFooter(`Timestamp: ${message.createdAt}`);
			user.send(afkEmbed);

			return message.delete().then(() => {
				message.reply(`you can't tag \`${user.username}\` who is **[ AFK ]**`).then(msg => msg.delete({ timeout: 2000 }));
			});
		}
	},
};