exports.run = async (message, args)=> {
    var string = '';
    message.reply(string)
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Trợ Giúp Bot Check Sever.')
    .setDescription(`**Được Code Bởi:** <@717857022841978881> \n**PREFIX:** \`.\``)
    .addFields(
        {name: `**Hướng Dẫn:**`, value: '```yaml\n.CHECK [Tên Ingame] : Check người chơi theo tên Ingame \n.CHECKID [Server ID] : Check người chơi theo Server ID\n.CHECKDISCORD [Discord ID] : Check người chơi theo Discord ID\n .CHECKSTEAM [Steam ID] : Check người chơi theo Steam ID\n'+ '```', inline: false})
    .setThumbnail('https://cdn.discordapp.com/attachments/976060131911532585/980372373654077500/IMG_6810.jpg')
    .setImage('https://media.discordapp.net/attachments/697049699193978941/746691133660332092/divider_1.gif') 
    .setTimestamp()   
    message.channel.send(exampleEmbed);
    
    return;  
  } 