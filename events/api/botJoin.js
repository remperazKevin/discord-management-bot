module.exports = {
	name: 'guildCreate',
	on: true,
	execute(guild) {
		console.log(`[API] Bot has joined ${guild.name}`);

		const guildClient = guild.client;
		guildClient.emit('ready', (guildClient));
	},
};