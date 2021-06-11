require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-visibility',
	description: 'Toggle visibility of a role',
	aliases: ['role-visibility', 'role-visible', 'role-hoisted'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t change mentions of an empty role', message.channel);

		const role = message.mentions.roles.first();
		if (!role) return embeds('arg', 'Please mention a `role`', message.channel);

		function toggleMention() {
			return message.inlineReply(`✅ Successfully changed role visibility of ${role}`)
				.catch(error => { return embeds('err', `There was an error changing role mentions of ${role}`, message.channel).then(() => { console.error(error); }); });
		}

		if (role.hoist === true) return role.setHoist(false, this.description).then(() => { return toggleMention(); });
		if (role.hoist === false) return role.setHoist(true, this.description).then(() => { return toggleMention(); });
	},
};
