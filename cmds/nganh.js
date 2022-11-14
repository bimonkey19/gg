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
           // var string ='';
            if (!error && response.statusCode === 200) 
              {
                let entry = body
                console.log(entry.length)

                var slpoliceswatquany=0;var slmed=0;var slchgdchpgdchtkchqlch=0
                for (let i=0; i<entry.length; i++) 
                    {
                     let name = entry[i]["name"].toLowerCase().trim();
                       var b = entry[i]["name"]; 
                       if(b.substring(0,6) == 'police' || name.indexOf('police') == 0 || name.indexOf('swat') == 0  || b.substring(0,4) == 'swat' || name.indexOf('sec') == 0  || b.substring(0,3) == 'SEC' ||name.indexOf('sec') == 0  || name.indexOf('gđcs') == 0 || b.substring(0,5 ) == 'GĐCS' || name.indexOf('PGĐCS') == 0  || name.indexOf('pgđcs') == 0 || b.substring(0,5 ) == 'pgđcs' || name.indexOf('QLCS') == 0  || name.indexOf('qlcs') == 0 || b.substring(0,5 ) == 'quân y ' || name.indexOf('Quân y') == 0  || name.indexOf('quân y ') == 0 || b.substring(0,5 ) == 'quân y '|| b.substring(0,4 ) == 'qlqy ' || name.indexOf('qlqy') == 0  || name.indexOf('qlqy ') == 0 || b.substring(0,5 ) == 'quân y ') slpoliceswatquany++;    
                       if(b.substring(0,2) == 'CH' || name.indexOf('ch') == 0 || b.substring(0,2) == 'CH' || name.indexOf('gdch') == 0  || b.substring(0,4) == 'GDCH' || name.indexOf('pgdch ') == 0  || b.substring(0,4) == 'PGDCH '|| name.indexOf('tkch') == 0  || b.substring(0,4) == 'TKCH' || name.indexOf('qlch') == 0  || b.substring(0,4) == 'qlch' ) slchgdchpgdchtkchqlch++;
                       if(b.substring(0,3) == 'MED' || name.indexOf('med') == 0 || b.substring(0,8) == 'med' | name.indexOf('gđbs') == 0  || b.substring(0,4) == 'GĐBS' ||name.indexOf('gđbs') == 0  || name.indexOf('pgđbs') == 0 || b.substring(0,5 ) == 'pgđbs' || name.indexOf('PGĐBS') == 0  || name.indexOf('qlbs') == 0 || b.substring(0,4 ) == 'QLBS' || name.indexOf('qlbs') == 0  || name.indexOf('qlbs') == 0 || b.substring(0,4 ) == 'qlbs') slmed++;

                    }
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#RANDOM')
                    .setAuthor(config.servername)
                    .setTitle('Số Lượng Ngành Online.')
                    .setTimestamp()
                    .setFooter('© Copyright by Juno',)
                    .addFields(                        
                                  {name:'- **Số Lượng Ngành Công An + Quân Y **:' +"   " +slpoliceswatquany ,value: '➖➖➖➖➖➖➖➖➖➖' },                        
                                  {name:'- **Số Lượng Ngành CH **:' +"   " +slchgdchpgdchtkchqlch ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng Ngành MED **:' +"   " +slmed,value: '➖➖➖➖➖➖➖➖➖➖' },








                            
                              )
                                    .setImage('https://cdn.discordapp.com/attachments/924504369980911617/924548278882807838/f44d15763348dcdb77cb21addeb12c69b071fa0cadc94dcf26a2764a3e78b359.gif')    
                     message.channel.send(exampleEmbed);               
                       }
                     }
        )
  }

 



