require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-mentionable',
	description: 'Toggle mentions of a role',
	aliases: ['role-mentionable', 'role-mentions', 'rolementionable', 'rolementions'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t change mentions of an empty role', message.channel);

		const role = message.mentions.roles.first();
		if (!role) return embeds('arg', 'Please mention a `role`', message.channel);

		function toggleMention() {
			return message.inlineReply(`✅ Successfully changed role mentions of ${role} to: \`${role.mentionable}\``)
				.catch(error => { return embeds('err', `There was an error changing role mentions of ${role}`, message.channel).then(() => { console.error(error); }); });
		}

		if (role.mentionable === true) return role.setMentionable(false, this.description).then(() => { return toggleMention(); });
		if (role.mentionable === false) return role.setMentionable(true, this.description).then(() => { return toggleMention(); });
	},
};
