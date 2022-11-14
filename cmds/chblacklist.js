exports.run = async (message, args)=> {
  let roomCommand = config.blacklistnganhdata["ch"].commandroomid
  let roomBan     = config.blacklistnganhdata["ch"].banroomid
  if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' )
  
  let bandata = await MongoClient.db("bannganh").collection("chban").find({}).toArray()
  let banchannel = client.channels.cache.get(roomBan);  

  d = new Date()
  datenow = d.getDate()
  monthnow = d.getMonth() + 1
  yearnow = d.getFullYear()
  daynow =(yearnow + ', ' + monthnow + ', ' +datenow )
  now = new Date(daynow)
  time = datenow + '/' +monthnow 

  if (bandata.length == 0) return banchannel.send(" `Hôm Nay Không Có Blacklist`" );

  banchannel.send("<@" + message.author.id + ">" );
  banchannel.send("**DANH SÁCH BLACKLIST CỨU HỘ NGÀY: " + time + "**" );
  await Runner.LoadBlacklist("ch" , banchannel , bandata)

}

