exports.run = async (message, args)=> {
    
    let help = `
    ${config.prefix}IP 
    ${config.prefix}UPTIME
    ${config.prefix}T [Nội Dung]: Talk Nội Dung 
    ${config.prefix}AVATAR @[TAGNAME] : check avatar người dùng
    ${config.prefix}INFO @[TAGNAME] : check info người dùng
    ${config.prefix}CHECK [Tên IG] (hoặc bỏ trống) : Check danh sách người chơi online có tên
    ${config.prefix}CHECKID [ID] : Check Thông Tin Theo ID 
    ${config.prefix}CHECKSTEAM [STEAM ID] : Check Thông Tin Theo Steam ID 
    ${config.prefix}CHECKDISCORD [DISCORD ID] : Check Thông Tin Theo Discord ID
    ${config.prefix}RANDOM [Số A] [Sô B] : Random từ số a đến số b
    ${config.prefix}PO: Xem danh sách CA Online
    ${config.prefix}CH : Xem danh sách CH Online
    ${config.prefix}MED : Xem danh sách MED Online
    ${config.prefix}GANG : Xem danh sách Gangsters Online
    ${config.prefix}GANGONLINE : Xem danh sách  Các Gangsters Online
    ${config.prefix}GG: Xem danh sách gang Go Griffin online
    ${config.prefix}AS : Xem danh sách gang Assassin online
    ${config.prefix}HM : Xem danh sách gang HẮC MA online
    ${config.prefix}LO : Xem danh sách gang LOWOLF online
    ${config.prefix}SB : Xem danh sách gang SHOWBIZ online
    ${config.prefix}SYG : Xem danh sách gang SYG online
    ${config.prefix}BHH : Xem danh sách gang BĂNG HỒNG HƯNG online
    ${config.prefix}King : Xem danh sách gang KingCobra online
    ${config.prefix}MJ : Xem danh sách gang MJ online
    --------------------Danh Sách Lệnh CHECK STEAM -----------------------
    ${config.prefix}CHECKHELP: Xem danh sách lệnh CHECK
    --------------------Danh Sách NGÀNH ONLINE  -----------------------
    ${config.prefix}NGANH : Xem danh sách  Ngành Online
    `
    
    message.reply('```yaml\n' + help +  '```')
       
    }
        
        