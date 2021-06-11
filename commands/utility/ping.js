const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Display bot ping',
	aliases: ['ping'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const ping = new MessageEmbed()
			.setColor('RED')
			.setDescription('⌛ Pinging...');
		return message.channel.send(ping).then(msg => {
			const ping_Embed = new MessageEmbed()
				.setColor('GREEN')
				.addField('📡 Websocket Heartbeat:', `\`\`\`${message.client.ws.ping} ms\`\`\``)
				.addField('📄 API Roundtrip:', `\`\`\`${msg.createdTimestamp - message.createdTimestamp} ms\`\`\``)
				.setTimestamp();
			return msg.edit(ping_Embed);
		});
	},
};