module.exports = {
	name: 'guildDelete',
	on: true,
	execute(guild) {
		console.log(`[API] Bot has left ${guild.name}`);

		const guildClient = guild.client;
		guildClient.emit('ready', (guildClient));
	},
};