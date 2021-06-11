require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'add-role',
	description: 'Create a new role, with optional color and hoist(visible to everyone)',
	aliases: ['add-role', 'create-role', 'addrole', 'createrole'],
	usage: '[name] [hexcolor] [hoist (true/false)]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t create an empty role', message.channel);

		const messageFormat = message.content.split(' ');
		const roleProperties = messageFormat.slice(2).join(' ');

		const roleName = roleProperties.match(/^[\w\s]+/gi);
		const roleColor = roleProperties.match(/(#[0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F][0-9/A-F])/gi);
		const roleHoist = roleProperties.match(/\btrue\b$/gi);

		return message.guild.roles.create({
			data: {
				name: roleName.toString(),
				color: (!roleColor) ? null : roleColor.toString(),
				hoist: (!roleHoist) ? null : roleHoist.toString().toLowerCase(),
				mentionable: true,
				reason: this.description,
			},
		})
			.then(() => { return message.inlineReply(`✅ Successfully created role: \`${roleName}\``); })
			.catch(error => { return embeds('err', `There was an error creating role: \`${roleName}\``, message.channel).then(() => { console.error(error); }); });
	},
};