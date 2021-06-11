require('../../util/inlineReply');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'webpage',
	description: 'Check my webpage',
	aliases: ['webpage', 'webpg', 'wbpg'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const clientBot = message.client.user;

		const invite_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }), process.env.BOT_WEBPAGE)
			.setDescription(`🔗 [**${clientBot.username} Webpage Link**](${process.env.BOT_WEBPAGE})`);
		return message.inlineReply(invite_Embed);
	},
};