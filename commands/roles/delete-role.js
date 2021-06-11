require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'delete-role',
	description: 'Delete a role',
	aliases: ['delete-role', 'del-role', 'deleterole', 'delrole'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t delete an empty role', message.channel);

		const role = message.mentions.roles.first();
		if (!role) return embeds('arg', 'Please mention a `role`', message.channel);
		return role.delete(this.description)
			.then(() => { return message.inlineReply(`✅ Successfully deleted role: \`${role.name}\``); })
			.catch(error => { return embeds('err', `There was an error deleting role: \`${role.name}\``, message.channel).then(() => { console.error(error); }); });
	},
};