const embeds = require('../../util/embeds');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'list-mods',
	description: 'List moderators',
	aliases: ['list-mods', 'listmods'],
	usage: '',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message) {
		const guild = message.guild;
		const guild_roles = guild.roles;

		const guildRoles = guild_roles.cache.sort((a, b) => b.position - a.position).map(role => role.name).join('\n');
		const modRole_Name = guildRoles.match(/.*mod\s*([^\n\r]*)/gi);
		if (!modRole_Name) return embeds('arg', 'There is no mod role found', message.channel);

		const modRole = guild_roles.cache.find(role => role.name === modRole_Name.toString());
		const modMember = guild_roles.cache.get(modRole.id).members.map(mod => mod.user.username).join('\n');
		const mods = (!modMember) ? `⚠️ Nobody found in ${modRole.name}` : modMember;

		const moderators_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(`📇 ${guild.name} Server Moderators`, guild.iconURL())
			.setTitle(mods);
		return message.channel.send(moderators_Embed)
			.catch(error => { return embeds('arg', 'There was an error listing all moderators', message.channel).then(() => { console.error(error); }); });
	},
};