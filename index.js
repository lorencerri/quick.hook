module.exports = async function (channel, message, options) {
  const init = new Promise(async resolve => { // Create Promise
    async function sendHook(hook, message, options) {

        // Check for Embed
        if (typeof message !== 'string' && ['RichEmbed', 'MessageEmbed'].includes(message.constructor.name)) {
            options.embeds = [message];
            message = null;
        }

        // Send Webhook
        let callback = await hook.send(message, {
            username: options.name,
            avatarURL: options.icon,
            embeds: options.embeds
        });
      
        resolve(callback);

    }

    async function fallback(channel, message, timer) {

        // Configure Channel
        channel = channel.channel || channel;

        // Send Embed
        let callback = await channel.send(message)

        // Run Options
        if (timer) callback.delete({
            timeout: timer
        })
      
        resolve(callback);

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
    let hook = webhooks.find(w => w.name === 'https://discord.gg/plexidev')
    if (!hook) {
        try {
            hook = await channel.createWebhook('https://discord.gg/plexidev', {
                avatar: 'https://cdn.discordapp.com/icons/343572980351107077/5afb9e4d2eb0f09ada16bd129ebf422f.png?size=512'
            });
        } catch (e) {
            hook = await channel.createWebhook('https://discord.gg/plexidev', 'https://cdn.discordapp.com/icons/343572980351107077/5afb9e4d2eb0f09ada16bd129ebf422f.png?size=512');
        }
        return sendHook(hook, message, options);
    }
    sendHook(hook, message, options);
  })
  return init;
}
