const embeds = require('../../util/embeds');
module.exports = {
	name: 'prune',
	description: 'Bulk delete messages',
	aliases: ['prune', 'purge'],
	usage: '[count (1 - 99)]',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
		if (!args.length) return embeds('arg', 'Please specify a number from `1 - 99`', message.channel);

		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return embeds('arg', 'Invalid argument found', message.channel);
		}
		else if (amount <= 1 || amount > 100) {
			return embeds('arg', 'Please to input a number between `1 and 99`', message.channel);
		}

		return message.channel.bulkDelete(amount, true)
			.catch(error => { return embeds('err', 'There was an error trying to prune messages in this channel', message.channel).then(() => { console.error(error); }); });
	},
};