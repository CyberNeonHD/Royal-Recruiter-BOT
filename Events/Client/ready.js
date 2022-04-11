const mongoose = require('mongoose');

module.exports = {
    name: "ready",
    once: true,

   execute(DiscordBot) {
       DiscordBot.user.setActivity('Recruitment', {type: "WATCHING"});

       //if(!process.env.Database) return;
       mongoose.connect('mongodb+srv://Cyberneon:AnonMongoKmotion258@royalrecruiter.xgpw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
           useNewUrlParser: true,
           useUnifiedTopology: true
       }).then(() => {
           console.log('The client is now connected to the database.')
       }).catch((err) =>{
           console.log(err)
       })
   }
}