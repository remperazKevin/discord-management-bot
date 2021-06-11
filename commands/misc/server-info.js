const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'server-info',
	description: 'Display server properties',
	aliases: ['server-info', 'serverinfo', 'server'],
	usage: '',
	guildOnly: true,
	permissions: 'MANAGE_GUILD',
	async execute(message) {
		const guild = message.guild;

		const guildMemberCount = guild.memberCount;
		const guildTextChannels = guild.channels.cache.filter(channel => channel.type === 'text').size;
		const guildVoiceChannels = guild.channels.cache.filter(channel => channel.type === 'voice').size;
		const guildPremiumTier = guild.premiumTier;
		const guildPremiumSubscriptionCount = guild.premiumSubscriptionCount;
		const guildMfaLevel = guild.mfaLevel;
		const guildRoles = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role);
		let roleList = guildRoles;
		if (guildRoles.length > 1024) return roleList = '⚠️ Too many roles to display';
		if (!guildRoles) return roleList = '⚠️ No roles found';

		const serverInfo_Embed = new MessageEmbed()
			.setColor('GOLD')
			.setAuthor(`🗃️ ${guild.name} server-info`, guild.iconURL())
			.setThumbnail(guild.iconURL())
			.addField('Owner', guild.owner.user, true)
			.addField('Region', guild.region, true)
			.addField('Locale', guild.preferredLocale, true)
			.addField('Verification Level', guild.verificationLevel, true)
			.addField('Explicit Content Filter', guild.explicitContentFilter, true)
			.addField('MFA Level', (guildMfaLevel === 0) ? 'No MFA Level Found' : `Level ${guildMfaLevel}`, true)
			.addField('Member Count', (guildMemberCount === 1) ? `${guildMemberCount} member` : `${guildMemberCount} members`, true)
			.addField('Text Channels', (guildTextChannels === 1) ? `${guildTextChannels} text channel` : `${guildTextChannels} text channels`, true)
			.addField('Voice Channels', (guildVoiceChannels === 1) ? `${guildVoiceChannels} channel channel` : `${guildVoiceChannels} voice channels`, true)
			.addField('Premium Tier', (guildPremiumTier === 0) ? 'No Premium Tier Found' : `Tier ${guildPremiumTier}`, true)
			.addField('Premium Subscription Count', (guildPremiumSubscriptionCount === 0) ? 'No Premium Subsription Found' : `${(guildPremiumSubscriptionCount === 1) ? `${guildPremiumSubscriptionCount} Subscription` : `${guildPremiumSubscriptionCount} Subscriptions`}`, true)
			.addField('Server Roles', roleList)
			.addField('ID', guild.id, true)
			.addField('Creation Date', guild.createdAt);
		return message.channel.send(serverInfo_Embed);
	},
};