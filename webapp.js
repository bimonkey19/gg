/////////////////modules///////////////
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressip = require('express-ip');
const passport = require("passport")
const session = require("express-session")
const path = require('path');   
const PORT = process.env.PORT || 5000
const app = express();



module.exports =
{
    main
}

 

async function main()
{



    app
    .set('views', path.join(__dirname, 'public'))
    .set('view engine', 'ejs')
    .engine('html', require('ejs').renderFile)
    .use(express.static(path.join(__dirname, 'public')))
    .use(cookieParser())
    .use(expressip().getIpInfoMiddleware)
    .use(session({ secret: "keyboard cat", resave: false, saveUninitialized: false }))
    .use(passport.initialize())
    .use(passport.session()) 
    .get('/tkonline', async (req, res) =>{  
      try
      {
        let tokenaccess = req.query.tokenaccess
        let dataaccess = await MongoClient.db("botdata").collection('tokenaccess').find({"tokenid" :tokenaccess }).toArray()
        if (!dataaccess || dataaccess.length == 0 ) return res.status(400).render("error/error.html", {title : "Expired", message : "Link đã hết hạn hoặc không tồn tại"})
        if (dataaccess[0].expire <new Date().getTime()) 
        {
            await MongoClient.db("botdata").collection('tokenaccess').deleteOne({"tokenid" :tokenaccess })
            return res.status(400).render("error/error.html", {title : "Expired", message : "Link đã hết hạn hoặc không tồn tại"})
        }
        let typecheck = dataaccess[0].type
        let timerangestart = dataaccess[0].timerange
        let timerangeend = timerangestart + 7*24*60*60*1000

        d = new Date();
        day    = d.getDay();
        let dayofweeknow = (day == 0 )? 6 : day -1 ;
        d.setHours(24*(- dayofweeknow  - 7*3 )  ,0,0,0);
        let rangetimetest = d.getTime()

        if (timerangestart < rangetimetest ) 
        {
            await MongoClient.db("botdata").collection('tokenaccess').deleteMany({"tokenid" :tokenaccess })
            return res.status(400).render("error/error.html", {title : "400", message : "Bad Request"})
        }

        let onlinedata = await MongoClient.db("checkingonline").collection(typecheck).find().toArray()
        if (typecheck == 'ca')
        {
            let qydata = await MongoClient.db("checkingonline").collection('qy').find().toArray()
            onlinedata = onlinedata.concat(qydata)
        }

        let idnhanvien = req.query.idnhanvien
        if (idnhanvien)
        {
            let datanhanvien = onlinedata.find(prdata => prdata.steamid == idnhanvien)
            let timelistinweek = datanhanvien.timelist.filter(time => (time >= timerangestart && time <= timerangeend))
            if (timelistinweek.length == 0) return res.status(400).render("error/error.html", {title : "400", message : "Bad Request"})
    
            let timelist = []
            let cacheindex = 0
    
            timelist.push({"timestart" : timelistinweek[0] , "timeend" : timelistinweek[0] })
    
            
            for (let j = 1 ; j < timelistinweek.length; j++)
            {
                let testrange = timelistinweek[j] - timelist[cacheindex].timeend 
                if (testrange < 1000*60*8) timelist[cacheindex--].timeend = timelistinweek[j]
                else timelist.push({"timestart" : timelistinweek[j] , "timeend" : timelistinweek[j]   })
                cacheindex++;
            }
            
            let sumtime = 0;
            let tablebody = ''

            for (let j = 0 ; j < timelist.length; j++)
            {
                let dstart = new Date(timelist[j].timestart)
                let dsend  = new Date(timelist[j].timeend+ 1000*60*5)
                let timeamount = Math.round((timelist[j].timeend - timelist[j].timestart)/60000)
                sumtime +=timeamount + 5;
                tablebody += `
                <tr>
                <td>${j+1}</td>
                <td>${dstart.getHours()}:${dstart.getMinutes()} ${dstart.getDate()}/${dstart.getMonth() + 1} - ${dsend.getHours()}:${dsend.getMinutes()} ${dsend.getDate()}/${dsend.getMonth() + 1}</td>
                <td>~${timeamount}-${timeamount +5} Phút</td>
                </tr> 
                `
            }
        
            profiledata = await fetch("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=F14BC8A2DD09043535A5F7A59745BFA1&steamids=" + idnhanvien).then(fdata=> {return fdata.json()}).then(fdata=> {return fdata.response.players[0]})

            
            html = fs.readFileSync("./public/tkonline/tkone.html" , "utf-8")
            html = html
            .replace("{{__TABLE_BODY__}}" ,  tablebody)
            .replace("{{__LINK_AVT__}}" ,  profiledata.avatarfull)
            .replace("{{__NAME__}}" ,  profiledata.personaname)
            .replace("{{__LINK_STEAM__}}" ,  profiledata.profileurl)
            .replace("{{__SUM_TIME__}}" ,  `${(sumtime - sumtime%60)/60} Giờ ${sumtime%60} Phút`)

            
     
        }
        else
        {
            let data = []
            for (let i = 0 ; i < onlinedata.length; i++)
            {
                let timelistinweek = onlinedata[i].timelist.filter(time => (time >= timerangestart && time <= timerangeend))
                if (timelistinweek.length == 0) continue;
        
                let timelist = []
                let cacheindex = 0
        
                timelist.push({"timestart" : timelistinweek[0] , "timeend" : timelistinweek[0] })
        
                
                for (let j = 1 ; j < timelistinweek.length; j++)
                {
                    let testrange = timelistinweek[j] - timelist[cacheindex].timeend 
                    if (testrange < 1000*60*8) timelist[cacheindex--].timeend = timelistinweek[j]
                    else timelist.push({"timestart" : timelistinweek[j] , "timeend" : timelistinweek[j]   })
                    cacheindex++;
                }
                
                let sumtime = 0;
                for (let j = 0 ; j < timelist.length; j++)
                sumtime +=Math.round((timelist[j].timeend - timelist[j].timestart)/60000) + 5;
       
                data.push({"name" : onlinedata[i].name , "steamid" : onlinedata[i].steamid , "sumtime" : sumtime  })
            }
    
            data.sort((a,b) => b.sumtime - a.sumtime)
            
            let tablebody = ''
    
            for (let i = 0 ; i < data.length ; i++)
            tablebody += `
            <tr onclick="document.location = '/tkonline?tokenaccess=${tokenaccess}&idnhanvien=${data[i].steamid}';"   >
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${(data[i].sumtime - data[i].sumtime%60)/60} Giờ ${data[i].sumtime%60} Phút</td>
            </tr> 
            `
            html = fs.readFileSync("./public/tkonline/tkall.html" , "utf-8")
            html = html
            .replace("{{__TABLE_BODY__}}" ,  tablebody)
     
        }
        html = html
        .replace("{{__DATE__}}" ,  `${new Date(timerangestart).getDate()}/${new Date(timerangestart).getMonth()+1}`)
        .replace("{{__TYPE__}}" ,  typecheck.toUpperCase())
        return res.send(html) 
     } 
      catch (err)
      {
        console.log(err)
        return res.status(400).render("error/error.html", {title : "400", message : "Bad Request"})
      }
    })
    
    .get("/*", async (req, res) => res.status(404).render("error/error.html", {title : "404", message : "Not found"}))
    .listen(PORT, () => Logger.info("WebApp" , `Listening on ${ PORT }`))


}
