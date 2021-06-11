const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'user-info',
	description: 'Display user info',
	aliases: ['user-info', 'userinfo', 'user'],
	usage: '[user / author]',
	guildOnly: true,
	async execute(message) {
		const user = message.mentions.users.first() || message.author;
		const member = message.guild.member(user);

		if (message.member.permissions.has('ADMINISTRATOR')) {
			const userInfo_Embed = new MessageEmbed()
				.setColor('GOLD')
				.setTitle(`🗃️ ${user.username} personal user-info`)
				.addField('is Bot?', `\`\`\`${user.bot}\`\`\``, true)
				.addField('Status', `\`\`\`${user.presence.status}\`\`\``, true)
				.addField('ID', `\`\`\`${user.id}\`\`\``, true)
				.addField('Username', `\`\`\`${user.username}\`\`\``, true)
				.addField('Discriminator', `\`\`\`#${user.discriminator}\`\`\``, true)
				.addField('Tag', `\`\`\`${user.tag}\`\`\``, true)
				.addField('Join Date', `\`\`\`${member.joinedAt}\`\`\``)
				.setImage(await user.displayAvatarURL({ dynamic: true, size: 128 }));
			message.author.send(userInfo_Embed);
		}

		const ppSize = ['SMOL', 'BIG'];
		const userInfo_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setTitle(`🗃️ ${user.username} user-info`)
			.addField('PP Size:', ppSize[Math.floor(Math.random() * ppSize.length)], true)
			.addField('Dank-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% dankness`, true)
			.addField('Epicgamer-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% epicgamer blood`, true)
			.addField('Gay-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% gay`, true)
			.addField('Simp-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% simp`, true)
			.addField('Stank-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% stankness`, true)
			.addField('Thot-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% thot`, true)
			.addField('Waifu-o-meter:', `${Math.floor((Math.random() * 100) + 1)}% waifu material`, true)
			.addField('Status:', user.presence.status, true)
			.addField('Roles:', member.roles.cache.sort((a, b) => b.position - a.position).map(role => role).join('\n'))
			.setImage(await user.displayAvatarURL({ dynamic: true, size: 128 }));
		return message.channel.send(userInfo_Embed);
	},
};