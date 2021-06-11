/* eslint-disable indent */
const { MessageEmbed } = require('discord.js');
module.exports = async (type = String, message, channel, rest) => {
	const embed = new MessageEmbed();

	function channelSend(content) {
		channel.send(content).then(msg => msg.delete({ timeout: (!rest) ? 3000 : rest }));
	}

	switch (type) {
		case 'arg':
			return channelSend(embed.setColor('YELLOW').setDescription(`⚠️ ${message}`));

		case 'err':
			return channelSend(embed.setColor('RED').setDescription(`❗ ${message}`));
	}
};