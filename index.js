require('dotenv').config();
require('./util/inlineReply');
const embeds = require('./util/embeds');
const fs = require('fs');
const { Client, Collection, MessageEmbed } = require('discord.js');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'] });
client.commands = new Collection();
client.cooldowns = new Collection();
client.queue = new Map();

const eventFolders = fs.readdirSync('./events');
for (const folder of eventFolders) {
	const eventFiles = fs.readdirSync(`./events/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`./events/${folder}/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		}
		else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}
}

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', async message => {
	const botName = client.user.tag;
	const botAvatar = client.user.displayAvatarURL({ dynamic: true });

	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return await embeds('arg', 'I can\'t execute that command inside DMs', message.channel);
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return await embeds('err', 'You don\'t have permissions to do that', message.channel);
		}
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 15) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;

			const cooldown_Embed = new MessageEmbed()
				.setColor('GOLD')
				.setAuthor(botName, botAvatar)
				.addField('❗ Command in cooldown', `⚠️ ${timeLeft.toFixed(1)} second(s) before reusing the \`${command.name}\` command`);
			return message.inlineReply(cooldown_Embed).then(msg => msg.delete({ timeout: 3000 }));
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);

		const cmdError_Embed = new MessageEmbed()
			.setColor('RED')
			.setAuthor(botName, botAvatar)
			.addField('‼️  Command Execution Error', '❗ There was an error trying to execute that command');
		return await message.inlineReply(cmdError_Embed).then(msg => msg.delete({ timeout: 3000 }));
	}
});

client.login();
