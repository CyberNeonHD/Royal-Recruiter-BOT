const mongoose = require('mongoose');
const {Database} = require('../../config.json');

module.exports = {
    name: "ready",
    once: true,

   execute(DiscordBot) {
       console.log('The client is now ready!')
       DiscordBot.user.setActivity('Recruitment', {type: "WATCHING"});

       if(!Database) return;
       mongoose.connect(Database, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       }).then(() => {
           console.log('The client is now connected to the database.')
       }).catch((err) =>{
           console.log(err)
       })
   }
}