var request = require("request")
exports.run = async (message, args)=> {
function cach(maxcach , length)
{
  khoangcach = "                                                                                                                                                                                    "
  return khoangcach.substring(0, maxcach - length)
}
function hasnametag(typenametag, namestring)
{
  namestring = namestring.trim().toLowerCase();
  var nametagdata = config.nametag[typenametag]
  if (!nametagdata || nametagdata.length == 0) return console.log('Nametag [' + typenametag + '] not found!')

  for (let i = 0; i < nametagdata.length; i++)
  if (namestring.indexOf(nametagdata[i]) === 0) return true;
  return false;
}
    let data
    request
    (
        {
          url : `http://${config.ip}/players.json`,
          json: true
        },
          function (error, response, body)
           {
             var string ='';
             let data = body;
             if (!error && response.statusCode === 200)
             {
        if (data === null || data === []) online = 0
        else online = data.length
        var listnamesb = [];
        var pagesb = 1;
        var sttchinhthuc = 1;
        var slsb = 0;
        var list = '';
        for (i=0; i < online ; i ++ )
        {
            thutusb = sttchinhthuc + cach(5 , sttchinhthuc.toString().length)
            ID = '[ID:' + data[i].id + ']' + cach(5 , data[i].id.toString().length)
            if (hasnametag('sb', data[i].name ))
            {
              var list = list +  '\n#' + sttchinhthuc + cach(4, sttchinhthuc.toString().length) +  ID + ': ' + data[i].name ;
              slsb ++;
              sttchinhthuc ++
            }

            if (list.length > 900) {
              listnamesb[pagesb++] = list;
              var list = '';
            };

          if (i == online - 1)
          {
            if (list) listnamesb[pagesb] = list;
            if (!listnamesb[pagesb])  pagesb--;
          }

        }
        var tengang1ne = 'SHOWBIZZ'
          let embed = new Discord.MessageEmbed()

          .setTitle(`${config.servername}`)
          .setThumbnail(config.linkavt)
          .setColor('RANDOM')
          .addFields(
              { name: `${tengang1ne} Online: `+slsb    , value: '➖➖➖➖➖➖➖➖➖➖' ,inline: false },
            )

        for (i = 1 ; i<= pagesb ; i++)
          {
          embed.addFields(
            { name: `Trang ${i}: `   , value: '```fix\r\n' + listnamesb[i]+'```' ,inline: false },
          )
          }
        embed.setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/924504369980911617/924548278882807838/f44d15763348dcdb77cb21addeb12c69b071fa0cadc94dcf26a2764a3e78b359.gif')
          message.reply(embed);
        }
    })
}
