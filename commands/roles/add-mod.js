require('../../util/inlineReply');
const embeds = require('../../util/embeds');

module.exports = {
	name: 'add-mod',
	description: 'Auto create a mod role (permissions already configured)',
	aliases: ['add-mod', 'create-mod', 'addmod', 'createmod'],
	usage: '[role name]',
	guildOnly: true,
	permissions: 'MANAGE_ROLES',
	async execute(message, args) {
		if (!args.length) return embeds('arg', 'Please specify a `role name`', message.channel);

		const name = message.content.split(' ');
		const mod_Name = name.slice(1);
		const modName = mod_Name.slice(1).join(' ');

		return message.guild.roles.create({
			data: {
				name: modName,
				hoist: true,
				mentionable: true,
				permissions: [
					'KICK_MEMBERS',
					'ADD_REACTIONS',
					'STREAM',
					'VIEW_CHANNEL',
					'SEND_MESSAGES',
					'SEND_TTS_MESSAGES',
					'MANAGE_MESSAGES',
					'EMBED_LINKS',
					'ATTACH_FILES',
					'READ_MESSAGE_HISTORY',
					'MENTION_EVERYONE',
					'USE_EXTERNAL_EMOJIS',
					'CONNECT',
					'SPEAK',
					'MUTE_MEMBERS',
					'USE_VAD',
				],
				reason: this.description,
			},
		})
			.then(() => { return message.inlineReply(`✅ Successfully created Mod role: \`${modName}\``); })
			.catch(error => { return embeds('err', 'There was an error creating the `Mod Role`', message.channel).then(() => { console.error(error); }); });
	},
};