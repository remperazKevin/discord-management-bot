require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'role-color',
	description: 'Change role color',
	aliases: ['role-color', 'rolecolor'],
	usage: '[role] [hexcolor]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t change color of an empty role', message.channel);

		const messageFormat = message.content.split(' ');
		const roleProperties = messageFormat.slice(3).join(' ');
		if (!roleProperties) return embeds('arg', 'Please input a `role color`', message.channel);

		const roleColor = roleProperties.match(/(#[0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F])/gi);
		if (!roleColor) return embeds('arg', 'Invalid role color', message.channel);

		const role = message.mentions.roles.first();
		if (!role) return embeds('arg', 'Please mention a `role`', message.channel);
		return role.setColor(roleColor.toString(), this.description)
			.then(() => { return message.inlineReply(`✅ Successfully changed ${role} role color to: \`${roleColor.toString()}\``); })
			.catch(error => { return embeds('arg', `There was an error changing role color of ${role}`, message.channel).then(() => { console.error(error); }); });
	},
};
