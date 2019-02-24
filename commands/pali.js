const Discord = require('discord.js');
module.exports = {
    name: 'pali',
    description: 'I mostly provide help on how to use the bot',
    aliases: ['palibot'],
    execute(message, args) {


      const msg = message.content.toLowerCase();

      if (msg.includes('help')){
        var titre = "Hi ! I'm the palibot !";
  			const embed = new Discord.RichEmbed()
  		  .setTitle(titre)
  		  .setColor("RANDOM")
  		  .setDescription("I'm here to help you hunt big meownsters ! :smiley_cat: ")
        .addBlankField(true)
  		  .addField("How to use me.",
  		    "```weak <monster>```makes me display one monster's weaknesses, ailments, and a\nrandom trivia\n ```info <monster>``` only makes me display its weaknesses and ailments.")
        .addBlankField(true)
  		  .addField("What if I can't find the monster ?", "Maybe you typed the monster's name wrong.\nI can understand for instance `weak yIAN Kut-KU` but I can't\nunderstand `weak yian kut ku` because of the missing hyphen.\n\n"
        +"Otherwise, maybe it's a bug. If you want to see it fixed, please pm [/u/yasefumi](https://www.reddit.com/message/compose/?to=Yasefumi) on reddit :)")

  		  .addBlankField(true)
  		  .addField("What if I was a good bot ?", "You can pet me with the command ```pali pet```");
        embed.setThumbnail('https://ih0.redbubble.net/image.98407351.3167/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg');
        console.log(`${message.guild.name}` + ` (${message.guild.memberCount} users) ${message.author.username} needed help.`)
  		  message.channel.send({embed});
		  }
      if (msg.includes('pet')){
        message.channel.send('Thank you master *purr purr*')
        console.log(`${message.guild.name}` + ` (${message.guild.memberCount} users) ${message.author.username} has pet me.`);

      }
    }
  }
