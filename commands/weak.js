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

  		  /*if (args[0].includes( 'talent' )|| args[0].includes('skill'))
            {message.channel.send('http://fr.mogapedia.wikia.com/wiki/MHGU_-_Liste_des_talents')}

  		  else if (args[0] === 'list'){message.channel.send(monstres.split(", ").sort().join(", "));}*/

        var monstre = ""
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

          const wiki = "https://monsterhunter.fandom.com/wiki/".concat(monstre)

          function wik(doc){



            const deb = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to:</h3>');
            const fin =  doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Habitats:</h3>');

            var weaknesses = ``; //contains all elements the monster is weak to

            const doc2 = doc.substring(deb,fin);
            for (var i=0; i < elements.length; i++){

              if (doc2.includes(elements[i])){
                current_elt = elements[i].replace(/ /g,'_');
                elt = client.emojis.find(emoji => emoji.name === current_elt+"_weakness");
                weaknesses = weaknesses.concat(`${elt}`+` `+elements[i]+`\n`)
                }
              }
              if (weaknesses === ``) {console.log("Failure.");
                                      return "This meownster doesn't even exists !";}

            var ail= "";
            const debail = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Ailment/s:</h3>');
            const finail = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to:</h3>')
            const docail = doc.substring(debail,finail)
            for (var i=0; i<ailments.length;i++){
              if (docail.includes(ailments[i])){
                current_ail = ailments[i];
                emoj_ail = client.emojis.find(emoji => emoji.name === current_ail+"_ailment");
                ail = ail.concat(emoj_ail+` `+ailments[i]+`\n`);
              }
            }
            if (ail === ``){
              ail = `None`
            }
              const deb2= doc.indexOf('<td colspan="2" style="background-color:#3A5766; color:#ffffff; font-weight:bold; font-size:9pt; text-align:center;"><b>Monster Hunter');
              const fin2 =  doc.indexOf('<b>Threat Level');
              var doc_thumb = doc.substring(deb2,fin2);
              while (doc_thumb.includes('deb2')){



              var doc_thumb = doc_thumb.substring(deb2,fin2); //contains the thumbnail

            }
              const deb3 = doc_thumb.indexOf('data-src=')+10;
              const fin3 = doc_thumb.indexOf('  	 width=')-1;
              doc_thumb = doc_thumb.substring(deb3,fin3);

                var embed = new Discord.RichEmbed()
              .setColor("RANDOM")
              .setTitle("Monster : ".concat(prettyname))
              .setURL(wiki)
              //.setDescription(wiki)
              .addField("Weakness(es) : ", weaknesses, true)
              .addField("Ailment(s) : ",ail, true )


              if (doc_thumb.includes(".png")){embed.setThumbnail(doc_thumb);}
              else {console.log("Success.");
                    return {embed};}

            console.log("Success.");
            return ({embed})
            }
        console.log(message.author.username.concat(" -> ".concat(prettyname)))
          fetch(wiki)
              .then(res => res.text())
              .then(body => message.channel.send(wik(body)))



          }

      }
