const { MessageEmbed, CommandInteraction } = require('discord.js');
require('../../Events/Client/ready');
const BM = require('@leventhan/battlemetrics');
const bmoptions = {
    token: process.env.TOKEN // after v1.4.8 don't add Bearer!
    serverID: process.env.SERVER_ID 
    game: process.env.GAME
};
const tBM = new BM(bmoptions);

module.exports = {
    name: 'bmstats',
    description: 'Takes steamID and returns players hours on server',
    options: [
        {
            name: 'steam64id',
            description: 'The steam64id of the Prospect',
            type: 'STRING',
            required: true,
        },{
            name: 'days',
            description: 'last x days of playtime (max 90)',
            type: 'INTEGER',
            required: false,
        },
    ],


    /**
     *
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        history = 0;
        count = 0;
        sum = 0;
        const { options } = interaction;
        const steam64id = options.getString('steam64id');
        if(options.getInteger('days') == null)
        {
            history = 14;
        }else{
            history = options.getInteger('days');
        }

        if(history > 90){
            const Response = new MessageEmbed();
                Response.setColor('RED');
                Response.setTitle('Error');
                Response.setThumbnail('https://i.imgur.com/0zHd6L9.png');
                Response.setDescription(`Error! Can't get more than last 90 days of hours!`);
                interaction.reply({embeds: [Response], fetchReply: true});
                return;
        }

       await tBM.getPlayerInfoBy("steamID", `${steam64id}`).then((res) => {
            console.log(res.data[0].relationships.player.data.id);
            const startDate = new Date();
            startDate.setDate( startDate.getDate() - history);
            startDate.setHours(0,0,0,0);
            const endDate = new Date();
            tBM.getPlayTimeHistory(res.data[0].relationships.player.data.id, tBM.serverID, startDate, endDate).then((res) => {
                while(count < history){
                    sum += res[count].attributes.value;
                    count += 1;
                }
                console.log(sum);
                sum = sum/60/60;
                console.log(sum);
                hours = sum.toString().split('.')[0];
                mins = parseFloat(sum).toFixed(2)-hours; //change to sum-sum[0] bit more efficient
                mins = parseFloat(mins*60).toFixed(0);
                const Response = new MessageEmbed();
                Response.setColor('GREEN');
                Response.setTitle('Player hours');
                Response.setImage('https://i.imgur.com/0zHd6L9.png');
                Response.setDescription(`SteamID:${steam64id}\nHours since ${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}: ${hours} hours and ${mins} mins`);
        
                interaction.reply({embeds: [Response], fetchReply: true});
            }).catch(err => {
                console.log(err);
            });
                
        }).catch(err => {
            console.log(err);
            
        });
    }
};//
