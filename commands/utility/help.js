require('../../util/inlineReply');
const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Get info about a specific command',
	aliases: ['help'],
	usage: '[command name]',
	guildOnly: true,
	permissions: 'SEND_MESSAGES',
	async execute(message, args) {
		const clientBot = message.client.user;
		const { commands } = message.client;

		if (!args.length) {
			const send_commandHelp_Embed = new MessageEmbed()
				.setColor('GOLD')
				.setURL(process.env.BOT_WEBPAGE)
				.setAuthor(`🔍 ${clientBot.username} Bot Help`, await clientBot.displayAvatarURL({ dynamic: true }), process.env.BOT_WEBPAGE)
				.setDescription(`🖥️ Check all my bot commands here: [**__${clientBot.username} Bot Official Website__**](${process.env.BOT_COMMANDS})`)
				.addField('\u200B', `❔ You can send \`${process.env.PREFIX} help [command name]\` to get info on a specific command`)
				.setFooter(`${clientBot.username} on ${message.guild.name}`);
			if (message.channel.type === 'dm') return;
			return message.inlineReply(send_commandHelp_Embed);
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) return embeds('arg', 'Invalid command!', message.channel);

		const commandHelp_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setURL(process.env.BOT_WEBPAGE)
			.setAuthor(`🔍 ${clientBot.username} Bot Help`, await clientBot.displayAvatarURL({ dynamic: true }), process.env.BOT_WEBPAGE)
			.setDescription('Heres how you use that command:')
			.addFields(
				{ name: 'Command Name:', value: `${process.env.PREFIX} ${command.name}`, inline: true },
				{ name: 'Aliases:', value: `${command.aliases.join(', ')}`, inline: true },
				{ name: 'Description:', value: `${command.description}` },
				{ name: 'Usage:', value: `${process.env.PREFIX} ${command.name} ${command.usage}` },
			)
			.setTimestamp()
			.setFooter(`${clientBot.username} on ${message.guild.name}`);
		return message.inlineReply(commandHelp_Embed);
	},
};