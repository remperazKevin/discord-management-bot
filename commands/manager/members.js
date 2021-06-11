const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'members',
	description: 'List members in a role(s)',
	aliases: ['members'],
	usage: '[role]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'I can\'t list member(s) in an empty role(s)', message.channel);

		const role = message.content.split(' ').slice(2).join(' ');
		if (!/(<@&\d+>)/gi.test(role)) return embeds('arg', 'Please mention a `role`', message.channel);

		return message.mentions.roles.forEach(roles => {
			const guild = message.guild;
			const guild_rolesCache = guild.roles.cache;
			const guildRole = guild_rolesCache.find(r => r.name === roles.name);
			const roleMembers = guild_rolesCache.get(guildRole.id).members;
			const roleMember = roleMembers.map(member => member.user.username).join('\n');
			const member = (!roleMember) ? `⚠️ Nobody found in ${guildRole.name}` : roleMember;

			const roleMembers_Embed = new MessageEmbed()
				.setColor('GOLD')
				.setAuthor((roleMembers.size === 1) ? `🗃️ User list in ${roles.name}` : `🗃️ Users list in ${roles.name}`, guild.iconURL())
				.setTitle(member);

			return message.channel.send(roleMembers_Embed)
				.catch(error => { return embeds('err', 'There was an error listing all members', message.channel).then(() => { console.error(error); }); });
		});
	},
};