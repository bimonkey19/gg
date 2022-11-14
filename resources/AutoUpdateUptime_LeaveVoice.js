exports.timeInterval = 9*1000
exports.main = async function () {
  function hasnametag(typenametag, namestring)
  {
    namestring = namestring.trim().toLowerCase();
    var nametagdata = config.nametag[typenametag]
    if (!nametagdata || nametagdata.length == 0) return console.log('Nametag [' + typenametag + '] not found!')

    for (let i = 0; i < nametagdata.length; i++)
    if (namestring.indexOf(nametagdata[i]) === 0) return true;
    return false;
  }
  try {
    data = await fetch(`http://${config.ip}/players.json`).then(dfetch => {return dfetch.json()})
    if (data === null || data === []) var online = 0
    else var online = data.length;
    var slpo = 0;
    var slqy = 0 ;
    var slmed = 0;
    var slch = 0;
    var slcdl = 0;
    var slpoqy = slpo + slqy;
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
    data = await fetch(`http://${config.ip}/info.json`).then(dfetch => {return dfetch.json()})
     client.user.setActivity ( + online + "/" +data.vars.sv_maxClients  +  ' | 👮🏻:'+slpoqy+'🔧:'+slch+'🚑:'+slmed+ ' | © Copyright by Juno ');
  }
  catch  (err) {
        Logger.warn("AUTO UPDATE UPTIME", err)
        client.user.setActivity('Server Offline Rồi :)) ')
  }


  if (cachevoice.length !=0) {
    cachevoice.forEach( cache => {
      var d = new Date();
      timeoutvoice = Math.round((d.getTime().toString() - cache.time) / 1000 / 60);

      if (timeoutvoice >=5) {
        let voicechannel_bot_connect = client.guilds.cache.get(cache.guildid).voice.channel
        if (voicechannel_bot_connect)  voicechannel_bot_connect.leave();
        cachevoice.splice(cachevoice.indexOf(cache) , 1)
      }
    })
  }

}
