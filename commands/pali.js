const Discord = require('discord.js');
module.exports = {
    name: 'pali',
    description: 'I mostly provide help on how to use the bot',
    aliases: ['palibot'],
    execute(message, args) {
      const msg = message.content.toLowerCase();

      if msg.includes('help'){
        var titre = "Hi ! I'm the palibot !");
  			const embed = new Discord.RichEmbed()
  		  .setTitle(titre)
  		  .setColor("RANDOM")
  		  .setDescription("I'm here to help you hunt big meownsters ! :3")

  		  .addField("How to use me.",
  		    "*```weak <monster>``` makes me display one monster's weaknesses and ailments. \n\n ")
  		  .addField("What if I can't find the monster ?", "Maybe you typed the monster's name wrong.\n I can understand for instance ```weak yIAN Kut-KU``` but not ```weak yian kut ku``` because of the missing hyphen.\nOtherwise, maybe it's a bug. If you want to see it fixed, please dm /u/yasefumi on reddit :)\n\n", true)

  		  .addBlankField(true)
  		  .addField("What if I was a good bot ?", "You can pet me with the command ```pali pet```", true);
        .setThumbnail('https://ih0.redbubble.net/image.98407351.3167/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg');

  		  message.channel.send({embed});
  			return;

		  }
    }
  }
