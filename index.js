module.exports = async function(channel, message, options) {

    function sendHook(hook, message, options) {
        
        // Check for Embed
        if (message.author === null) {
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
        icon: options.icon || null
    }
    if (isNaN(options.delete)) options.delete = false;

    // Fetch Webhooks
    let webhooks = await channel.fetchWebhooks().catch(err => {
        fallback(channel, message, options.delete)
    });

    // Assign Webhook
    let hook = webhooks.find('name', 'https://discord.io/plexidev')
    if (!hook) {
        hook = await channel.createWebhook('https://discord.io/plexidev', {
            avatar: 'https://pbs.twimg.com/profile_images/944717552290226176/zBF2n9zr_400x400.jpg'
        })
        return sendHook(hook, message, options);
    }
    sendHook(hook, message, options);

}