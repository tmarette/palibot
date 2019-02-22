const fetch = require('node-fetch');
const Discord = require('discord.js');
const elements = ['Fire','Ice','Dragon','Thunder','Water'];
const ailments = ['Poison','Deadly Poison', 'Noxious Poison', 'Paralysis', 'Sleep', 'Stun', 'Defense Down', 'Soiled', 'Fatigue','Snowman','Muddy','Blastblight','Frenzy Virus','Webbed','Bleeding','Confusion','Bubbleblight','Mucus','Ossified','Effluvium','Fireblight','Waterblight','Thunderblight','Iceblight','Dragonblight'];


module.exports = {
    name: 'weak',
    description: 'i give one monster weaknesses',
    execute(message, args) {

      function capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
            }


      const msg = message.content.toLowerCase();
      console.log(msg)
      var monstre = "" //will contain the correct name for the url

                    var prettyname = ""
                      for (var i = 0; i < args.length; i++) {
                        if (i != 0) {
                          prettyname = prettyname.concat(" ");
                           monstre = monstre.concat("_");
                         }
                            if (args[i].includes("-")) {
                                    const mots = args[i].split("-");
                                    for (var j=0;j < mots.length;j++){
                                      if (j!=0){
                                        monstre = monstre.concat("-");
                                        prettyname = prettyname.concat("-");
                                      }
                                    const a = capitalize(mots[j])
                                    monstre = monstre.concat(a);
                                    prettyname = prettyname.concat(a);
                                  }
                                }
                         else{
                              monstre = monstre.concat(capitalize(args[i]))
                              prettyname = prettyname.concat(capitalize(args[i]));
                               }
              }

          const wiki = "https://monsterhunter.fandom.com/wiki/" + monstre //The url we are fetching




          function wik(doc){
              //first we get all the weaknesses of the monster.
            var weaknesses = ``;
            const deb = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to:</h3>');
            const fin =  doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Habitats:</h3>');

            const doc2 = doc.substring(deb,fin);
            for (var i=0; i < elements.length; i++){

              if (doc2.includes(elements[i])){
                current_elt = elements[i].replace(/ /g,'_');
                elt = client.emojis.find(emoji => emoji.name === current_elt+"_weakness");
                weaknesses = weaknesses.concat(`${elt}`+` `+elements[i]+`\n`)
                }
              }
              if (weaknesses === ``) {console.log("Failure.");
                                      return "This meownster doesn't even exists !";} //if no weakness found, then the url might me wrong, thus indicating the monster doesnt exists

            //Now we get its ailments.

            var ail= "";
            const debail = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Ailment/s:</h3>');
            const finail = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to:</h3>')
            const docail = doc.substring(debail,finail)
            for (var i=0; i<ailments.length;i++){
              if (docail.includes(ailments[i])){
                current_ail = ailments[i].replace(/ /g,'_');

                emoj_ail = client.emojis.find(emoji => emoji.name === current_ail+"_ailment");
                ail = ail.concat(emoj_ail+` `+ailments[i]+`\n`);
              }
            }
            if (ail === ``){
              ail = `None`
            }

            //Now we get the thumbnail
              const deb2= doc.indexOf('<td colspan="2" style="background-color:#3A5766; color:#ffffff; font-weight:bold; font-size:9pt; text-align:center;"><b>Monster Hunter');
              const fin2 =  doc.indexOf('<b>Threat Level');
              var doc_thumb = doc.substring(deb2,fin2);
              while (doc_thumb.includes('deb2')){

              var doc_thumb = doc_thumb.substring(deb2,fin2);

            }

              const deb3 = doc_thumb.indexOf('data-src=')+10;
              const fin3 = doc_thumb.indexOf('  	 width=')-1;
              doc_thumb = doc_thumb.substring(deb3,fin3); //url of the thumbnail is between deb3 and fin3

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
