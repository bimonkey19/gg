exports.run = async (message, args)=> {
  const exampleEmbed = new Discord.MessageEmbed()
      .setAuthor('𝒲𝑒𝓁𝒸𝑜𝓂𝑒 SYG GANGZ')
    
      .setTitle('*** Bạn bật F8 và Connect bên dưới nhé ***')
      .addFields(
                  { name: 'Bước 1',             value: '***```Bấm F8```***' },
                  { name: 'Bước 2',             value: '***```Paste link : Connect 3bp8kr```***' },
                  { name: 'Bước 3',             value: '***```Sau đó ENTER để vào thành phố```***' },
                  { name: 'SYG GANGZ Said',             value: '***" Chúc các bạn chơi game vui vẻ "***' },
         
                )
      .setThumbnail('https://pkmacbook.com/wp-content/uploads/2021/06/hinh-anh-welcome-3d_094125580.jpg')
     .setColor('RANDOM')
      .setTimestamp()
      .setImage('https://cdn.discordapp.com/attachments/697049699193978941/746691133660332092/divider_1.gif')  
 message.channel.send(exampleEmbed);
  return; 
} 