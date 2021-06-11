require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-name',
	description: 'Change role name',
	aliases: ['role-name', 'rolename'],
	usage: '[role] [hexcolor]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t change name of an empty role', message.channel);

		const messageFormat = message.content.split(' ');
		const roleName = messageFormat.slice(3).join(' ');
		if (!roleName) return embeds('arg', 'Please input a `role name`', message.channel);

		const role = message.mentions.roles.first();
		if (!role) return embeds('arg', 'Please mention a `role`', message.channel);
		return role.setName(roleName.toString(), this.description)
			.then(() => { return message.inlineReply(`✅ Successfully changed role name to: \`${roleName.toString()}\``); })
			.catch(error => { return embeds('err', `There was an error changing role name of ${role}`, message.channel).then(() => { console.error(error); }); });
	},
};