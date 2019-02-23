const fetch = require('node-fetch');
const Discord = require('discord.js');
const elements = ['Fire','Ice','Dragon','Thunder','Water'];
const ailments = ['Poison','Deadly Poison', 'Noxious Poison', 'Paralysis', 'Sleep', 'Stun', 'Defense Down', 'Soiled', 'Fatigue','Snowman','Muddy','Blastblight','Frenzy Virus','Webbed','Bleeding','Confusion','Bubbleblight','Mucus','Ossified','Effluvium','Fireblight','Waterblight','Thunderblight','Iceblight','Dragonblight'];


module.exports = {
    name: 'weak',
    description: 'i give one monster weaknesses',
    execute(message, args) {

      function capitalize(string) {

        mots = string.split("-")
        var sortie = ""

        for (var i = 0; i < mots.length; i++) {
          mot = mots[i];
          sortie += mot.charAt(0).toUpperCase() + mot.slice(1) + "-";
        }
        return sortie.slice(0,sortie.length-1)
      }



      const msg = message.content.slice(5,message.length).toLowerCase();
      var monstre = "" //will contain the correct name for the url
      var prettyname = "" //will contain a pretty name for the monster, with capitalized letters
      const monster_name = msg.split(" ");
      for (var i = 0; i < monster_name.length; i++) {
          name_bits = monster_name[i]
          monstre +=  capitalize(name_bits) + "_";
          prettyname +=  capitalize(name_bits) + " ";
      }

        monstre = monstre.slice(0,monstre.length-1)
        prettyname = prettyname.slice(0,prettyname.length-1)
        const wiki = "https://monsterhunter.fandom.com/wiki/" + monstre //The url we are fetching




        function wik(doc){

          //We first create 'weaknesses', the string containing the monster's weaknesses.

          const begin_weak = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to');
          const end_weak =  doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Habitats');

          var weaknesses = ``;

          const doc2 = doc.substring(begin_weak,end_weak);
          for (var i=0; i < elements.length; i++){

            if (doc2.includes(elements[i])){
              current_elt = elements[i].replace(/ /g,'_');
              elt = client.emojis.find(emoji => emoji.name === current_elt + "_weakness");
              weaknesses = weaknesses.concat(`${elt}` + ` ` + elements[i] + `\n`)
              }
            }
          if (weaknesses === ``) {
            console.log("Failure.");
            return "This meownster doesn't even exists !";
          }


          //Now we create 'ail', the string containing the ailments.

          var ail= "";
          const begin_ailment = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Ailment');
          const end_ailment = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to')
          const docail = doc.substring(begin_ailment,end_ailment)
          for (var i=0; i<ailments.length;i++){
            if (docail.includes(ailments[i])){
              current_ail = ailments[i].replace(/ /g, '_');
              emoj_ail = client.emojis.find(emoji => emoji.name === current_ail + "_ailment");
              ail = ail.concat(emoj_ail + ` ` + ailments[i]+`\n`);
            }
          }
          if (ail === ``){
            ail = `None`
          }

          //We now create the embed.

          const begin_narrow_document= doc.indexOf('<td colspan="2" style="background-color:#3A5766; color:#ffffff; font-weight:bold; font-size:9pt; text-align:center;"><b>Monster Hunter');
          const end_narrow_document =  doc.indexOf('<b>Threat Level');
          var doc_thumb = doc.substring(begin_narrow_document,end_narrow_document);

          while (doc_thumb.includes('begin_narrow_document')){
            var doc_thumb = doc_thumb.substring(begin_narrow_document,end_narrow_document); //contains the thumbnail
          }

          const begin_thumbnail = doc_thumb.indexOf('data-src=')+10;
          const end_thumbnail = doc_thumb.indexOf('  	 width=')-1;
          doc_thumb = doc_thumb.substring(begin_thumbnail,end_thumbnail);


              //Now creating the embed message
          var embed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setTitle("Monster : ".concat(prettyname))
            .setURL(wiki)
            //.setDescription(wiki)
            .addField("Weakness(es) : ", weaknesses, true)
            .addField("Ailment(s) : ",ail, true )

            if (doc_thumb.includes(".png")){embed.setThumbnail(doc_thumb);} //If there is a fitting image, then it is the thumbnail

              console.log("Success."); //Let's put in the logs that the request is a success
              return ({embed}) //Let's return the final message
            }
        console.log(message.guild.name + ` (${message.guild.memberCount} users)` + " -> "+ prettyname + ` (request by ${message.author.username})`); //Nice logs
        fetch(wiki)
            .then(res => res.text())
            .then(body => message.channel.send(wik(body)))

          }

      }
