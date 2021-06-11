module.exports = {
	name: 'ready',
	on: true,
	execute(client) {
		console.log(`${client.readyAt}`);
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity(`${process.env.PREFIX} help | ${client.guilds.cache.size} servers`, { type: 'WATCHING' })
			.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
			.catch(console.error);
	},
};