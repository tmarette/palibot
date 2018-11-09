const fetch = require('node-fetch');
const Discord = require('discord.js');

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



  		      var monstre = capitalize(args[0])
  		      var prettyname = capitalize(args[0])
  		        for (var i = 1; i < args.length; i++) {
                  prettyname = prettyname.concat(" ");
  			           monstre = monstre.concat("_");
  			              if (args[i].includes("-")) {
  				                    const [a,b] = args[i].split("-");
  				                    monstre = monstre.concat(capitalize(a));
  				                    prettyname = prettyname.concat(capitalize(a));
  				                    monstre = monstre.concat("-");
  				                    prettyname = prettyname.concat("-");
  				                    monstre = monstre.concat(capitalize(b));
  				                    prettyname = prettyname.concat(capitalize(b));
  			                       }
  			           else{
  		                  monstre = monstre.concat(capitalize(args[i]))
  		                  prettyname = prettyname.concat(capitalize(args[i]));
  			                 }
  		  }

  	      const wiki = "https://monsterhunter.fandom.com/wiki/".concat(monstre)

          function wik(doc){


            const elements = ['Fire','Ice','Dragon','Thunder','Water']
            const deb = doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Weakest to:</h3>');
            const fin =  doc.indexOf('<h3 class="pi-data-label pi-secondary-font">Habitats:</h3>');

            var sortie = "" //contains all elements the monster is weak to
            const doc2 = doc.substring(deb,fin);
            for (var i=0; i < elements.length; i++){

              if (doc2.includes(elements[i])){
                sortie = sortie.concat(elements[i]+"\n")
                }
              }

              if (sortie === "") {return "This meownster doesn't even exists !";}
              if (Math.random() >.999) {sortie = sortie.concat("Also, this monster seems weak to Death :3")}


              const deb2 = doc.indexOf('<td colspan="2" style="background-color:#3A5766; color:#ffffff; font-weight:bold; font-size:9pt; text-align:center;"><b>Monster Hunter Generations</b>');
              const fin2 =  doc.indexOf('<b>Threat Level');
              var doc_thumb = doc.substring(deb2,fin2); //contains the thumbnail
              const deb3 = doc_thumb.indexOf('data-src=')+10;
              const fin3 = doc_thumb.indexOf('  	 width=')-1;
              doc_thumb = doc_thumb.substring(deb3,fin3);

                var embed = new Discord.RichEmbed()
              .setTitle("Monster : ".concat(prettyname))
              .setDescription(wiki)

              .addField("Weaknesse(s) : ", sortie, true)
              .setColor("RANDOM")
              /*try {embed.setThumbnail(doc_thumb)} catch(error){
                console.error(error);
              }*/
            return ({embed})
            }
        console.log(prettyname)
          fetch(wiki)
              .then(res => res.text())
              .then(body => message.channel.send(wik(body)))



          }

      }
