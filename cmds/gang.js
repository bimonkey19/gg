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

                var slgg=0;var slMJ=0;var slhm=0;var sllo=0;var slvgz=0;var slas=0;var slsb=0;var slbhh=0;var slblood=0;var slking=0;var slbro=0;
                for (let i=0; i<entry.length; i++) 
                    {
                     let name = entry[i]["name"].toLowerCase().trim();
                       var b = entry[i]["name"]; 
                       if(b.substring(0,4) == 'gg' || name.indexOf('gg') == 0 || name.indexOf('gg') == 0  || b.substring(0,4) == 'gg') slgg++;
                       if(b.substring(0,2) == 'MJ' || name.indexOf('MJ') == 0) slMJ++;
                       if(b.substring(0,5) == 'Hắc Ma' || name.indexOf('hắc ma ') == 0 || b.substring(0,5) == 'Hắc Ma') slhm++;
                       if(b.substring(0,3) == 'LOW' || name.indexOf('low') == 0 || b.substring(0,3) == 'low') sllo++;
                       if(b.substring(0,) == 'VGZ' || name.indexOf('vgz') == 0 || b.substring(0,3) == 'vgz') slvgz++;
                       if(b.substring(0,5) == 'Assassin ' || name.indexOf('assassin') == 0 || b.substring(0,3) == 'Assassin ') slas++;
                       if(b.substring(0,22) == 'SB ' || name.indexOf('sb') == 0 || b.substring(0,3) == 'sb ') slsb++;
                       if(b.substring(0,55) == 'BHH ' || name.indexOf('bhh') == 0 || b.substring(0,3) == 'bhh ') slbhh++;
                       if(b.substring(0,33) == 'BLOOD ' || name.indexOf('blood') == 0 || b.substring(0,3) == 'blood ') slblood++;
                       if(b.substring(0,66) == 'BRO ' || name.indexOf('bro') == 0 || b.substring(0,3) == 'bro ') slbro++;
                       if(b.substring(0,44) == 'KingCobra ' || name.indexOf('kingcobra') == 0 || b.substring(0,3) == 'KingCobra ') slking++;





                    }
                    const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#RANDOM')
                    .setAuthor(config.servername)
                    .setTitle('Số Chơi Của Các Gang.')
                    .setThumbnail('https://thanhtoanhoadon365.com/wp-content/uploads/2022/04/anya-forger-la-ai-nhan-vat-anime-spy-x-family-5.jpg')
                    .setTimestamp()
                    .setFooter('© Copyright by Juno ',)
                    .addFields(                        
                                  {name:'- **Số Lượng GANG GG **:' +"   " +slgg ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG MJ **:' +"   " +slMJ ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG Hắc Ma  **:' +"   " +slhm ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG LOW **:' +"   " +sllo ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG VGZ **:' +"   " +slvgz ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG ASSASSIN **:' +"   " +slas ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG SB **:' +"   " +slsb ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG BHH **:' +"   " +slbhh ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG BLOOD **:' +"   " +slblood ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG BRO **:' +"   " +slbro ,value: '➖➖➖➖➖➖➖➖➖➖' },
                                  {name:'- **Số Lượng GANG KingCobra **:' +"   " +slking ,value: '➖➖➖➖➖➖➖➖➖➖' },








                            
                              )
                                    .setImage('https://cdn.discordapp.com/attachments/924504369980911617/924548278882807838/f44d15763348dcdb77cb21addeb12c69b071fa0cadc94dcf26a2764a3e78b359.gif')    
                     message.channel.send(exampleEmbed);               
                       }
                     }
        )
  }

 



