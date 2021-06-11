require('../../util/inlineReply');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'invite',
	description: 'Invite me in your servers',
	aliases: ['invite', 'invite-link', 'inv'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const clientBot = message.client.user;

		const invite_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(clientBot.username, await clientBot.displayAvatarURL({ dynamic: true }), process.env.BOT_WEBPAGE)
			.setDescription(`🔗 [**${clientBot.username} Invite Link**](${process.env.BOT_INVITE})`);
		return message.inlineReply(invite_Embed);
	},
};