const { Speaking } = require("discord.js");
exports.run = async (message, args)=> {
 
var fetch = require("node-fetch");
function hasnametag(typenametag, namestring)
{
  namestring = namestring.trim().toLowerCase();
  var nametagdata = config.nametag[typenametag]
  if (!nametagdata || nametagdata.length == 0) return console.log('Nametag [' + typenametag + '] not found!')

  for (let i = 0; i < nametagdata.length; i++)
  if (namestring.indexOf(nametagdata[i]) === 0) return true;
  return false;
}
try 
{
  data = await fetch(`http://${config.ip}/players.json`)
  data = await data.json()
  if (data === null || data === []) var online = 0
  else var online = data.length;
var slpo= 0;
    var slqy = 0 ;
    var slmed = 0;
    var slch = 0;
  for (i=0; i < online ; i ++ )
  {
    ten =data[i].name

    if (hasnametag('police' , ten))
    {

      slpo++
    }
    if (hasnametag('qy' , ten))
    {
      slqy++
    }
    if (hasnametag('ch' , ten))
    {

      slch++
    }
    if (hasnametag('med' , ten))
    {
      slmed++
    }
  }
  var slpoqy = slpo + slqy;

  data = await fetch(`http://${config.ip}/info.json`)
  data = await data.json()



  var embed = new Discord.MessageEmbed()
  .setTitle(config.servername)
  .setThumbnail(config.linkavt)
  .setColor('RANDOM')
  .addFields(
    { name: 'Trong Game', value:  '```yaml\r\n Số Người Chơi : '+ online + "/" +data.vars.sv_maxClients + ' | 👮🏻:'+slpoqy+'🔧:'+slch+'🚑:'+slmed+ '```',inline: false },

  )
  .setTimestamp();
  message.reply(embed);

}
catch  { message.reply('`Server đang Offline`') }


}
    
    