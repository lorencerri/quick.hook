

Fast webhook 
========

<div align="center">
    <p>
        <a href="https://discord.com/invite/7BeDqdRFtE"><img src="https://discordapp.com/api/guilds/794655657433104425/embed.png" alt="Discord Server" /></a>
    </p>
</div> 

### Support Discord: [https://discord.com/invite/7BeDqdRFtE](https://discord.com/invite/7BeDqdRFtE)

---

This package creates an easy way to send webhooks, *as well as providing fallbacks if the client does not have the proper permissions*.

*If the client does not have the permission `Manage Webhooks`, it will send a normal message instead, causing no issues and working seamlessly*

---

```js
const send = require('fast-webhook');
```

## Documentation
Parameter | Type | Optional | Default | Description
--- | --- | --- | --- | ---
channel | `textChannel` | false | *none* | The channel to send the webhook to
message | `string` **or** `embed` | false | *none* | The message or embed to send
options | `object` | true | *none* | The options for the webhook
options.name | `string` | true | Server Invite | The title of the webhook
options.icon | `iconURL` | true | *Webhook Icon* | The icon of the webhook

---

## Examples

<details>
  <summary><b>Normal message</b></summary>

  ![](https://i.imgur.com/rW8ciG1.png) 
```js
const send = require('fast-webhook');

send(message.channel, 'Current Settings...', {
    name: 'Settings',
    icon: 'https://i.imgur.com/X9eAmHm.png'
})
```
</details>

<details>
  <summary><b>Embed message</b></summary>

![](https://i.imgur.com/U4lItWR.png) 
```js
const send = require('fast-webhook');
const { MessageEmbed } = require('discord.js');

const embed = new MessageEmbed()
    .setColor("#77C2AE")
    .setTitle(`California`)
    .setDescription(`**By *Clayton James***`)
    .setFooter(`Just a normal embed!`);

send(message.channel, embed, {
    name: 'Now Playing',
    icon: 'https://i.imgur.com/44YTwve.png'
})
```
</details>

---

© [TrueXPixels](https://discord.gg/plexidev) 2018 || Edited by [DomeQ#0001](https://discord.gg/7BeDqdRFtE)