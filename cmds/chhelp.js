exports.run = async (message, args)=> {
    var string = '';
    message.reply(string)
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Trợ Giúp Bot Check Sever.')
    .setDescription(`**Được Code Bởi:** <@717857022841978881> \n**PREFIX:** \`.\``)
    .addFields(
        {name: `**Hướng Dẫn:**`, value: '```yaml\n.CHBL [Linksteam] [Số ngày] [Lý Do] : Tạo Blacklist\n.CHUNBL [Linksteam] [Lý Do] : Gỡ Blacklist\n.CHBLACKLIST : Xuất Danh Sách Blacklist\n.TKONLINE [Số tuần trước] : Thống kê thời gian online của các nhân viên (Số tuần trước bỏ trống sẽ mặc định này tuần này)'+ '```', inline: false})
    .setThumbnail('https://cdn.discordapp.com/attachments/967711793860468746/970350264433393694/089A5F9E-FD68-49A2-9E5F-AA035FFB4123.jpg')
    .setImage('https://media.discordapp.net/attachments/697049699193978941/746691133660332092/divider_1.gif') 
    .setTimestamp()   
    message.channel.send(exampleEmbed);
    
    return;  
  } 