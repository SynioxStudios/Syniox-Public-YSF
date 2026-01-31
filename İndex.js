const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const VOICE_CHANNEL_ID = "1466525109861749000"; 
let totalExecs = 0;

client.once('ready', () => {
    console.log(`${client.user.tag} Online`);
});

app.use(express.json());

app.post('/api/update', async (req, res) => {
    totalExecs++;
    try {
        const voiceChan = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (voiceChan) {
            await voiceChan.setName(`🌐 script executed: ${totalExecs}`);
        }
    } catch (e) {}
    res.send({ success: true, count: totalExecs });
});

app.listen(process.env.PORT || 3000);
client.login(process.env.TOKEN);

