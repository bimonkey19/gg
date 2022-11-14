exports.run = async (message, args)=> {

    let roomCommand = config.blacklistnganhdata["ca"].commandroomid
    if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Người Nhà Nươc Sử Dụng ở` <#' + roomCommand +'>' )
    /* if (roomCommand != message.channel.id ) return message.reply('`Lệnh Này Chỉ Có Thể Sử Dụng ở ` <#' + roomCommand +'>' ) */

    var string = '';
    message.reply(string)
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Trợ Giúp Lệnh Công An.')
    .setDescription(`**Được Code Bởi:** <@717857022841978881> \n**PREFIX:** \`.\``)
    .addFields(
        {name: `**Hướng Dẫn:**`, value: '```yaml\n.TRUYNA [Linksteam] [Số Phút] [Lý Do] : Tạo Truy Nã\n.GOTRUYNA [Linksteam] [Lý Do] : Gỡ Truy Nã\n.CATRUYNA : Xuất Danh Sách Truy Nã\n.TKONLINE [Số tuần trước] : Thống kê thời gian online của các nhân viên (Số tuần trước bỏ trống sẽ mặc định này tuần này)'+ '```', inline: false})
    .setThumbnail('https://cdn.discordapp.com/attachments/967711793860468746/970350264433393694/089A5F9E-FD68-49A2-9E5F-AA035FFB4123.jpg')
    .setImage('https://media.discordapp.net/attachments/697049699193978941/746691133660332092/divider_1.gif') 
    .setTimestamp()   
    message.channel.send(exampleEmbed);
    return;  
   
}
   

    
    