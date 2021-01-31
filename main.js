module.exports = async(channel, message, options = {}) => {
    if(!channel) return console.log(`[ FAST WEBHOOK ] Invalid channel.`);
    if(!channel.send || !channel.fetchWebhooks) return console.log(`[ FAST WEBHOOK ] Invalid channel.`)
    if(!message) return console.log(`[ FAST WEBHOOK ] Invalid message/embed.`)
    options = {
        delete: options.delete || false,
        name: options.name || (channel.client.user.username || "Slash"),
        icon: options.icon || (channel.client.user.displayAvatarURL({ dynamic: true }) || "")        
    }
    if(isNaN(options.delete)) options.delete = false;

    let webhooks = await channel.fetchWebhooks().catch(() => {
        console.log(`[ FAST WEBHOOK ] Can't fetch webhooks in #${channel.name} (${channel.id}) at guild ${channel.guild.name} (${channel.guild.id})`)
    });

    if(webhooks) return;

    let hook = webhooks.find(w => w.name === channel.client.user.username)

    let error = false;
    if(!hook) {
        try {
            hook = await channel.createWebhook(channel.client.user.username || "Slash", {
                avatar: channel.client.user.displayAvatarURL({ dynamic: true }) || ""
            });
        } catch(err) {
            error = true;
            console.log(`[ FAST WEBHOOK ] Can't create webhook in #${channel.name} (${channel.id}) at guild ${channel.guild.name} (${channel.guild.id})`)
        }
    }

    if(error) return;

    if (typeof message !== 'string' && ['MessageEmbed'].includes(message.constructor.name)) {
        options.embeds = [message];
        message = null;
    }

    let callback = await hook.send(message, {
        username: options.name,
        avatarURL: options.icon,
        embeds: options.embeds
    });

    return callback;
}