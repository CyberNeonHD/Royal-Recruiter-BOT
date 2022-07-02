const mongoose = require('mongoose');

module.exports = {
    name: "ready",
    once: true,

   execute(DiscordBot) {
        DiscordBot.user.setActivity('Recruitment', {type: "WATCHING"});

        mongoose.connect(process.env.Database, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           keepAlive: true
        }).then(() => {
           console.log('The client is now connected to the database.');
        }).catch((err) =>{
           console.log(err);
        });
   }
};
