 var request = require("request")
exports.run = async (message, args)=> {
function cach(maxcach , length)
{
  khoangcach = "                                                                                                                                                                                    "
  return khoangcach.substring(0, maxcach - length)
}
function hasnametaggang(nametagdata, namestring)
{
  namestring = namestring.trim().toLowerCase();

  for (let i = 0; i < nametagdata.length; i++)
    if (namestring.indexOf(nametagdata[i]) === 0) return true;
  return false;
}
    request
    (
        {
          url: `http://${config.ip}/players.json`,
          json: true
        },
          function (error, response, body)
           {
             var string ='';
             var data = body;
             if (!error && response.statusCode === 200)
             {
              for (let i = 0; i < config.gang.length; i++) {
                var gangdata = config.gang[i]
                var list = ''
                var stt = 1
                var listname = [];
                var page = 1;
                var sl = 0;

                for (let j=0; j < data.length ; j++ )
                {
                  ten =data[j].name


                  if(hasnametaggang(gangdata.nametag , ten))
                  {
                    list += '\n[ID:' + data[j].id + ']' + cach(6 , data[j].id.toString().length ) + ': ' + data[j].name
                    sl++
                    stt++
                  }
                  if (list.length > 800)
                  {
                    listname[page++] = list;
                    var list = '';
                  };
                if (j == data.length - 1)
                {
                  if (list) listname[page] = list;
                  if (!listname[page])  page--;
                }
              }
                if (list) {
                  if (page == 2){

                  let embed = new Discord.MessageEmbed()
                  .setTitle(config.servername)
                  .setThumbnail(config.linkavt)
                  .setColor('RANDOM')
                  .addFields(
                    { name: `${gangdata.label} Online: ` +sl   , value: '➖➖➖➖➖➖➖➖➖➖' ,inline: false },
                  )
                  for (var z = 1 ; z<= page ; z++)
    {
    embed.addFields({ name: `Trang ${z}: `   , value: '```fix\r\n' + listname[z]+'```' ,inline: false })
    }
                embed.setTimestamp()
            .setImage('https://cdn.discordapp.com/attachments/924504369980911617/924548278882807838/f44d15763348dcdb77cb21addeb12c69b071fa0cadc94dcf26a2764a3e78b359.gif')
                  message.reply(embed);

              }
              if (page == 1){
                let embed = new Discord.MessageEmbed()
                .setTitle(config.servername)
                .setThumbnail(config.linkavt)
                .setColor('RANDOM')
                .addFields(
                  { name: `${gangdata.label} Online: ` +sl   , value: '➖➖➖➖➖➖➖➖➖➖' ,inline: false },
                )
                for (var z = 1 ; z<= page ; z++)
    {
    embed.addFields({ name: `Trang ${z}: `   , value: '```fix\r\n' + listname[z]+'```' ,inline: false })
    }
              embed.setTimestamp()
              .setImage('https://cdn.discordapp.com/attachments/924504369980911617/924548278882807838/f44d15763348dcdb77cb21addeb12c69b071fa0cadc94dcf26a2764a3e78b359.gif')
                message.reply(embed);
              }
            }
            }
               }
          }
        )
  }

 



