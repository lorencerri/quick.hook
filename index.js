module.exports = async function (channel, message, options) {

    function sendHook(hook, message, options) {

        // Check for Embed
        if (typeof message !== 'string' && ['RichEmbed', 'MessageEmbed'].includes(message.constructor.name)) {
            options.embeds = [message];
            message = null;
        }

        // Send Webhook
        let callback = hook.send(message, {
            username: options.name,
            avatarURL: options.icon,
            embeds: options.embeds
        })

    }

    function fallback(channel, message, timer) {

        // Configure Channel
        channel = channel.channel || channel;

        // Send Embed
        let callback = channel.send(message)

        // Run Options
        if (timer) callback.delete({
            timeout: timer
        })

    }

    // Verify Input
    if (!channel) return console.log('HOOK: Please read the NPM page for documentation.')

    // Configure Channel
    channel = channel.channel || channel;

    // Return Statements
    if (!channel.send || !channel.fetchWebhooks) return console.log('HOOK: Invalid Channel.');
    if (!message) return console.log('HOOK: Invalid Message.');

    // Configure Settings
    if (!options) options = {};
    options = {
        delete: options.delete || false,
        color: options.color || null,
        name: options.name || 'Message',
        icon: options.icon || undefined
    }
    if (isNaN(options.delete)) options.delete = false;

    // Fetch Webhooks
    let sended = false;
    let webhooks = await channel.fetchWebhooks().catch(err => {
        sended = true;
        fallback(channel, message, options.delete)
    });
    if(sended) return;

    // Assign Webhook
    let hook = webhooks.find(w => w.name === 'https://discord.io/plexidev')
    if (!hook) {
        try {
            hook = await channel.createWebhook('https://discord.io/plexidev', {
                avatar: 'https://pbs.twimg.com/profile_images/944717552290226176/zBF2n9zr_400x400.jpg'
            });
        } catch (e) {
            hook = await channel.createWebhook('https://discord.io/plexidev', 'https://pbs.twimg.com/profile_images/944717552290226176/zBF2n9zr_400x400.jpg');
        }
        return sendHook(hook, message, options);
    }
    sendHook(hook, message, options);

}
