const mongoose = require('mongoose');

module.exports = {
    name: "ready",
    once: true,

   execute(DiscordBot) {
        DiscordBot.user.setActivity('Recruitment', {type: "WATCHING"});

        mongoose.connect("mongodb+srv://Cyberneon:xsuSxP3UuX7gvYEX@royalbattalion.3kzuo.mongodb.net/?retryWrites=true&w=majority", {
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
