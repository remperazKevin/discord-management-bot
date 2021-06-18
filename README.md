# Discord Management Bot

> Stripped down version of [**HoloHub Discord Management Bot**](https://remperazkevin.github.io/holohub.github.io/)

- - -

## Bot Functions

> **[-!]** Marked feature(s) have conflict with current code structure

### List of Commands

<details>
<summary> <b>Manager</b> </summary>

|          Command Name | Command Usage                                   |             Command Description             |
| --------------------: | :---------------------------------------------- | :-----------------------------------------: |
| **Announce-everyone** | **`!hb announce-everyone [channel] [message]`** |    Send an announcement with `@everyone`    |
|     **Announce-here** | **`!hb announce-here [channel] [message]`**     |      Send an announcement with `@here`      |
|     **Announce-role** | **`!hb announce-role [channel] [message]`**     | Send an announcement with a role(s) mention |
|          **Announce** | **`!hb announce [channel] [message]`**          |            Send an announcement             |
|          **Ban-list** | **`!hb ban-list`**                              |           List all banned members           |
|         **List-mods** | **`!hb list-mods`**                             |               List moderators               |
|      **Lockdown-end** | **`!hb lockdown-end`**                          |        Unlock channel from everyone         |
|          **Lockdown** | **`!hb lockdown`**                              |         Lock channel from everyone          |
|           **Members** | **`!hb members`**                               |          List members in a role(s)          |
|              **Nuke** | **`!hb nuke`**                                  |               Nuke a channel                |
|             **Prune** | **`!hb prune [count (1 - 99)]`**                |            Bulk delete messages             |
|               **Say** | **`!hb say [channel] [message]`**               |         Make the bot say a message          |

</details>

<details>
<summary> <b>Misc</b> </summary>

|     Command Name | Command Usage                        |     Command Description     |
| ---------------: | :----------------------------------- | :-------------------------: |
|          **AFK** | **`!hb afk`**                        |    Set `[ AFK ]` status     |
| **Member-count** | **`!hb member-count`**               | Display server member count |
|  **Server-info** | **`!hb server-info`**                |  Display server properties  |
|     **Set-nick** | **`!hb set-nick [user] [nickname]`** |    Change user nickname     |
|    **User-info** | **`!hb user-info [user / author]`**  |      Display user info      |

</details>

<details>
<summary> <b>Moderator</b> </summary>

| Command Name | Command Usage                  |         Command Description          |
| -----------: | :----------------------------- | :----------------------------------: |
|      **Ban** | **`!hb ban [user] [reason]`**  |         Ban a violating user         |
|     **Jail** | **`!hb jail [user]`**          |           Put user to jail           |
|     **Kick** | **`!hb kick [user] [reason]`** |             Kick a user              |
|     **Mute** | **`!hb mute [user]`**          | Temporarily disable user permissions |
|   **Unjail** | **`!hb unjail [user]`**        |        Release user from jail        |

</details>

<details>
<summary> <b>Roles</b> </summary>

|         Command Name | Command Usage                                                  |                          Command Description                          |
| -------------------: | :------------------------------------------------------------- | :-------------------------------------------------------------------: |
|          **Add-mod** | **`!hb add-mod [role name]`**                                  |        Auto create a mod role (permissions already configured)        |
|         **Add-role** | **`!hb add-role [role name] [hexcolor] [hoist (true/false)]`** | Create a new role, with optional color and hoist(visible to everyone) |
|       **Delete-mod** | **`!hb delete-mod [role / user]`**                             |                   Delete a moderator(s) or mod role                   |
|      **Delete-role** | **`!hb delete-role [role]`**                                   |                            Delete a role'                             |
|         **Role-add** | **`!hb role-add [user] [role]`**                               |                       Add role(s) to a user(s)                        |
|         **Role-all** | **`!hb role-all [role]`**                                      |            Add/remove all users from a role (Limit 1 role)            |
|        **Role-bots** | **`!hb role-bots [role]`**                                     |         Add/remove all bots to or from a role (Limit 1 role)          |
|       **Role-color** | **`!hb role-color [role] [hexcolor]`**                         |                           Change role color                           |
|      **Role-humans** | **`!hb role-humans [role]`**                                   |         Add/remove all users to or from a role (Limit 1 role)         |
|        **Role-info** | **`!hb role-info [role]`**                                     |                     Display info of a given role                      |
| **Role-mentionable** | **`!hb role-mentionable [role]`**                              |                       Toggle mentions of a role                       |
|        **Role-move** | **`!hb role-move [old role] [new role]`**                      |            Move all users to or from a role (Limit 1 role)            |
|   **Role-removeall** | **`!hb role-removeall [role]`**                                |                      Remove all roles of a user                       |
|  **Role-visibility** | **`!hb role-visibility [role]`**                               |                      Toggle visibility of a role                      |
|             **Role** | **`!hb role [user] [role]`**                                   |                    Add/remove role(s) from a user                     |
|            **Roles** | **`!hb roles (optional search)`**                              |                     Dislay a list of server roles                     |

</details>

<details>
<summary> <b>Setup</b> </summary>

|      Command Name | Command Usage           |  Command Description  |
| ----------------: | :---------------------- | :-------------------: |
| **Arrival-setup** | **`!hb arrival-setup`** | Setup arrival channel |
| **Logging-setup** | **`!hb logging-setup`** | Setup logging channel |

</details>

<details>
<summary> <b>Utility</b> </summary>

| Command Name | Command Usage                 |        Command Description        |
| -----------: | :---------------------------- | :-------------------------------: |
|     **Help** | **`!hb help [command name]`** | Get info about a specific command |
|   **Invite** | **`!hb invite`**              |        Get bot invite link        |
|     **Ping** | **`!hb ping`**                |         Display bot ping          |
|  **Webpage** | **`!hb webpage`**             |       Get bot webpage link        |

</details>

- - -

## Server Logging

- **Channel Create**
- **Channel Delete**
- **~~Channel Pins Update~~ [-!]**
- **Channel Update**
- **Guild Ban**
- **Guild Unban**
- **Guild New Member**
- **Guild Left Member**
- **Guild Update Member**
- **~~Message Delete~~ [-!]**
- **Message Bulk Delete**
- **Role Create**
- **Role Delete**
- **Voice State**
