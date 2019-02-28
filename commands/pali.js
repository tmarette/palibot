const Discord = require('discord.js');
module.exports = {
    name: 'pali',
    description: 'I mostly provide help on how to use the bot',
    aliases: ['palibot'],
    execute(message, args) {


      const msg = message.content.toLowerCase();

      if (msg.includes('help')){
        var titre = "Nyaa ! I'm the palibot !";
  			const embed = new Discord.RichEmbed()
  		  .setTitle(titre)
  		  .setColor("RANDOM")
  		  .setDescription("I'm here to help you hunt big meownsters ! :smiley_cat: ")
        .addBlankField(true)
  		  .addField("How to use me.",
  		    "```info <monster>```makes me display one monster's weaknesses, ailments, and a\nrandom trivia\n ```weak <monster>``` only makes me display its weaknesses and ailments.\nPlease note that I can understand only partial monster name (`weak jho` will display information about deviljho!)\nI can also pm you the message if you don't wanna spam with the commands `pmweak monster` and `pminfo monster`")
        .addBlankField(true)
  		  .addField("What if I can't find the meownster ?", "Maybe you typed the meownster's name wrong.\nI can understand for instance `weak yIAN Kut-KU` but I can't\nunderstand `weak yian kut ku` because of the missing hyphen.\n\n"
        +"Otherwise, maybe it's a bug. If you want to see it fixed, please pm [/u/yasefumi](https://www.reddit.com/message/compose/?to=Yasefumi) on reddit :)")

  		  .addBlankField(true)
  		  .addField("What if I was a good bot ?", "You can pet me with the command ```pali pet```");
        embed.setThumbnail('https://ih0.redbubble.net/image.98407351.3167/st%2Csmall%2C215x235-pad%2C210x230%2Cf8f8f8.lite-1u2.jpg');
        try {console.log(`${message.guild.name}` + ` (${message.guild.memberCount} users) ${message.author.username} needed help.`)} catch(e) {
        console.log(e.stack);
    }
  		  message.channel.send({embed});
		  }
      if (msg.includes('pet')){
        message.channel.send('Thank you Meowster *purr purr*')
          try {console.log(`${message.guild.name}` + ` (${message.guild.memberCount} users) ${message.author.username} has pet me.`)} catch(e) {
          console.log(e.stack);
      }
    }
    if (msg.includes('emoji')){
      const nbr = message.content.toLowerCase().slice(12,12);
      message.channel.send(`${client.emojis.random(nbr)}`)
    }
  }
}
