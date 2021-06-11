const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'nuke',
	description: '***KA-BOOM***',
	aliases: ['nuke'],
	usage: '',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	async execute(message) {
		const nuked = new MessageEmbed()
			.setColor('GREEN')
			.setTitle('‼️ **KA-BOOM**')
			.setTimestamp();

		return message.channel.clone().then(channel => {
			channel.setPosition(message.channel.position);
			channel.send(nuked);
		}).then(() => { return message.channel.delete(); });
	},
};