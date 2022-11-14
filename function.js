const { createCanvas, loadImage } = require("canvas");

/////////////export/////////////////////
module.exports = {
  GetRandomString,
  delay,
  cach,
  restart,
  CheckBlacklistNganh,
  UpdateBlacklistNganh,
  UpdateDoiTen,
  LoadBlacklist,
  SendErrorLog,
  CheckOnlineNganh,
  LoadResources,
  GetDataServerFromCfx,
};
////////////////////////////////////////

async function GetRandomString(LENGTHTEXT) {
  let codereturn = "";
  let textcache =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 1; i <= LENGTHTEXT; i++)
    codereturn += textcache.charAt(
      Math.floor(Math.random() * textcache.length)
    );
  return codereturn;
}

async function SendErrorLog(_where, _err) {
  _err = _err.toString();
  let contenterrorlog = `**ERROR: ${_where}**${"```"}fix\n${_err}${"```"}`;
  if (
    _err.indexOf("Server responded with 404") == 0 ||
    _err.indexOf("FetchError: request to") == 0 ||
    _err.indexOf("FetchError: invalid json response body at") == 0
  )
    Logger.warn(_where, _err);
  else Logger.error(_where, _err);
}

async function UpdateDoiTen(type) {
  let typedata = config.blacklistnganhdata[type];
  if (!typedata)
    return SendErrorLog(`AUTO UPDATE DOI TEN`, ` Type **${type}** Unknown`);

  let guildata = config.blacklistnganhdata[type];

  if (guildata) {
    let bancheckchannel = client.channels.cache.get(guildata.banroom2id);
    let botlogchannel = client.channels.cache.get(guildata.banlogid);

    let bandata = await MongoClient.db("bannganh")
      .collection(`${type}ban`)
      .find({})
      .toArray();

    for (let i = 0; i < bandata.length; i++) {
      let steamid = bandata[i].steamid;
      let steamdata = await fetch(
        "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=F14BC8A2DD09043535A5F7A59745BFA1&format=json&steamids=" +
          steamid
      );
      steamdata = await steamdata.json();
      if (steamdata.response.players.length != 0) {
        let newusername = steamdata.response.players[0].personaname.trim();
        let username = bandata[i].username;
        if (newusername != username.trim()) {
          var nameuser = bandata[i].name;
          var reason = bandata[i].reason;
          if (type == "ca")
            var thoigian = "`" + `${bandata[i].thoigian} Phút` + "`";
          else {
            let dstart = new Date(bandata[i].timestart);
            let datestart = dstart.getDate();
            let monthstart = dstart.getMonth() + 1;
            let dend = new Date(bandata[i].timeend);
            let dateend = dend.getDate();
            let monthend = dend.getMonth() + 1;
            let offset = bandata[i].timeend - now.getTime();
            let time = Math.round(offset / 1000 / 60 / 60 / 24);
            var thoigian =
              "`" +
              `${datestart}/${monthstart} - ${dateend}/${monthend}` +
              "`" +
              `( Còn ${time} Ngày)`;
          }
          let embed = new Discord.MessageEmbed()
            .setColor([255, 255, 0])
            .addFields({
              name: "CẢNH BÁO CÓ NGƯỜI ĐỔI TÊN",
              value: `Người ${typedata.content}: ${nameuser}
Người Bị ${typedata.content}: **${newusername}** ( Tên Cũ: *${username}*)
Thời Gian: ${thoigian} 
Lý Do: *${reason}*
Link Steam: https://steamcommunity.com/profiles/${steamid}`,
            });

          await MongoClient.db("bannganh")
            .collection(`${type}ban`)
            .updateMany(
              { steamid: `${steamid}` },
              { $set: { username: `${newusername}` } }
            );
          await bancheckchannel.send(embed);
          await botlogchannel.send(
            "**AUTO CHECK NAME:** Phát Hiện và Cập Nhật User đổi tên thành công (`ID:" +
              steamid +
              "`)"
          );
        }
      }
    }
  }
}

async function UpdateBlacklistNganh(type) {
  let typedata = config.blacklistnganhdata[type];
  if (!typedata)
    return SendErrorLog(`AUTO UPDATE BLACKLIST`, ` Type **${type}** Unknown`);

  let updatetime = await MongoClient.db("bannganh")
    .collection("updatetime")
    .find({ nganh: type })
    .toArray();

  await MongoClient.db("bannganh")
    .collection(`${type}ban`)
    .deleteMany({ timeend: { $lt: now } });

  if (updatetime.length != 0 && updatetime[0].date != datenow) {
    let banchannel = client.channels.cache.get(typedata.banroomid);
    let botlogchannel = client.channels.cache.get(typedata.banlogid);

    let bandata = await MongoClient.db("bannganh")
      .collection(`${type}ban`)
      .find({})
      .toArray();

    if (bandata.length == 0)
      banchannel.send(
        " `Hôm Nay Không Có " + typedata.content.toUpperCase() + "`"
      );
    else {
      let rolelist = "";
      typedata.rolestaffid.forEach((rd) => (rolelist += ` <@&${rd}>`));
      banchannel.send(
        `${rolelist}\n**______AUTO UPDATE ${typedata.content.toUpperCase()} HẰNG NGÀY______** `
      );
      await LoadBlacklist(type, banchannel, bandata);
    }

    await botlogchannel.send(
      `AUTO: Đã Cập Nhật ${typedata.content} Hằng Ngày!`
    );

    await MongoClient.db("bannganh")
      .collection("updatetime")
      .updateMany({ nganh: type }, { $set: { date: `${datenow}` } });
  }
}

async function LoadBlacklist(type, channel, data) {
  let typedata = config.blacklistnganhdata[type];
  data.forEach(async (band, index) => {
    let userbanning = band.name;
    let userbanned = band.username;
    let reason = band.reason;
    let steamid = band.steamid;

    if (type == "po") var thoigian = "`" + `${band.thoigian} Phút` + "`";
    else {
      let dstart = new Date(band.timestart);
      let datestart = dstart.getDate();
      let monthstart = dstart.getMonth() + 1;
      let yearstart = dstart.getFullYear();
      let dend = new Date(band.timeend);
      let dateend = dend.getDate();
      let monthend = dend.getMonth() + 1;
      let yearend = dend.getFullYear();
      let offset = band.timeend - now.getTime();
      let time = Math.round(offset / 1000 / 60 / 60 / 24);
      var thoigian =
        "`" +
        `${datestart}/${monthstart}/${yearstart} - ${dateend}/${monthend}/${yearend}` +
        "`" +
        `( Còn ${time} Ngày)`;
    }
    if (type == "ch") {
      var typeban = "Cứu Hộ";
    }
    if (type == "po") {
      var typeban = "Cảnh Sát";
    }
    if (type == "med") {
      var typeban = "Bác Sĩ";
    }

    let stt = index + 1;
    let embed = new Discord.MessageEmbed().setColor([127, 0, 255]).addFields({
      name: `${stt}/ Thông Tin ${typedata.content} ${typeban}: `,
      value: `Người ${typedata.content}: ${userbanning}
Người Bị ${typedata.content}: **${userbanned}**
Thời Gian: ${thoigian} 
Lý Do: *${reason}*
Link Steam: https://steamcommunity.com/profiles/${steamid}`,
    });
    await channel.send(embed);
  });
}

/* ---README-- CheckBlacklistNganh Code Example
data = await fetch(`http://${config.ip}/players.json`)
data = await data.json()
liststeamid = {}
data.forEach((sd) => 
{
    steamidhex = sd.identifiers.find(fd => (fd.indexOf('steam') === 0))
  steamid    = converter.hexToDec(steamidhex.slice(6, steamidhex.length))
  liststeamid[steamid] = {"id" : sd.id , "name" : sd.name}
})
 await Runner.CheckBlacklistNganh("ca")
*/

async function CheckBlacklistNganh(type) {
  let typedata = config.blacklistnganhdata[type];
  if (!typedata)
    return SendErrorLog(`BLACKLIST CHECKING`, ` Type **${type}** Unknown`);

  let bandata = await MongoClient.db("bannganh")
    .collection(`${type}ban`)
    .find({})
    .toArray();
  let bancheckchannel = client.channels.cache.get(typedata.bancheckid);
  let botlogchannel = client.channels.cache.get(typedata.banlogid);
  let stt = 1;
  let checklist = "";

  await bandata.forEach(async (bdata) => {
    let persondata = liststeamid[bdata.steamid];
    if (persondata) {
      checklist += `\n#${stt}${cach(4, stt.toString().length)}[ID:${
        persondata.id
      }]${cach(6, persondata.id.toString().length)}: ${persondata.name}`;
      stt++;
    }
  });
  if (type == "ch") {
    var typeban = "Cứu Hộ";
  }
  if (type == "ca") {
    var typeban = "Công An";
  }
  if (type == "med") {
    var typeban = "Bác Sĩ";
  }

  if (checklist) {
    let embed = new Discord.MessageEmbed()
      .setTitle(config.servername)
      .setThumbnail(config.linkavt)
      .setColor("RANDOM")
      .addFields({
        name: `Danh Sách ${typedata.content} ${typeban} Online`,
        value: "```fix" + checklist + "```",
      })
      .setTimestamp();
    bancheckchannel.send(embed);
    botlogchannel.send(
      `**AUTO-CHECKING-ONLINE:** Đã Cập Nhật Danh Sách ${typedata.content} ${typeban} Online`
    );
  }
}

//// --------------------------------------------- !CHECKING ONLINE NGÀNH! ---------------------------------------------

async function CheckOnlineNganh() {
  let cadata = await MongoClient.db("checkingonline")
    .collection(`ca`)
    .find({})
    .toArray();
  let qydata = await MongoClient.db("checkingonline")
    .collection(`qy`)
    .find({})
    .toArray();
  let meddata = await MongoClient.db("checkingonline")
    .collection(`med`)
    .find({})
    .toArray();
  let chdata = await MongoClient.db("checkingonline")
    .collection(`ch`)
    .find({})
    .toArray();

  function hasnametag(typenametag, namestring) {
    namestring = namestring.trim().toLowerCase();
    var nametagdata = config.nametag[typenametag];
    if (!nametagdata || nametagdata.length == 0)
      return console.log("Nametag [" + typenametag + "] not found!");

    for (
      let i_hasnametag = 0;
      i_hasnametag < nametagdata.length;
      i_hasnametag++
    )
      if (namestring.indexOf(nametagdata[i_hasnametag]) === 0) return true;

    return false;
  }

  let canews = [];
  let qynews = [];
  let mednews = [];
  let chnews = [];

  let d = new Date();

  for (let key in liststeamid) {
    if (hasnametag("ca", liststeamid[key].name)) {
      if (!cadata.find((d) => d.steamid == key))
        canews.push({
          steamid: key,
          name: liststeamid[key].name,
          timelist: [d.getTime()],
        });
      else
        await MongoClient.db("checkingonline")
          .collection(`ca`)
          .updateMany(
            { steamid: key },
            {
              $set: { name: liststeamid[key].name },
              $push: { timelist: d.getTime() },
            }
          );
    } else if (hasnametag("qy", liststeamid[key].name)) {
      if (!qydata.find((d) => d.steamid == key))
        qynews.push({
          steamid: key,
          name: liststeamid[key].name,
          timelist: [d.getTime()],
        });
      else
        await MongoClient.db("checkingonline")
          .collection(`qy`)
          .updateMany(
            { steamid: key },
            {
              $set: { name: liststeamid[key].name },
              $push: { timelist: d.getTime() },
            }
          );
    } else if (hasnametag("med", liststeamid[key].name)) {
      if (!meddata.find((d) => d.steamid == key))
        mednews.push({
          steamid: key,
          name: liststeamid[key].name,
          timelist: [d.getTime()],
        });
      else
        await MongoClient.db("checkingonline")
          .collection(`med`)
          .updateMany(
            { steamid: key },
            {
              $set: { name: liststeamid[key].name },
              $push: { timelist: d.getTime() },
            }
          );
    } else if (hasnametag("ch", liststeamid[key].name)) {
      if (!chdata.find((d) => d.steamid == key))
        chnews.push({
          steamid: key,
          name: liststeamid[key].name,
          timelist: [d.getTime()],
        });
      else
        await MongoClient.db("checkingonline")
          .collection(`ch`)
          .updateMany(
            { steamid: key },
            {
              $set: { name: liststeamid[key].name },
              $push: { timelist: d.getTime() },
            }
          );
    }
  }

  if (canews.length > 0)
    await MongoClient.db("checkingonline").collection(`ca`).insertMany(canews);
  if (qynews.length > 0)
    await MongoClient.db("checkingonline").collection(`qy`).insertMany(qynews);
  if (mednews.length > 0)
    await MongoClient.db("checkingonline")
      .collection(`med`)
      .insertMany(mednews);
  if (chnews.length > 0)
    await MongoClient.db("checkingonline").collection(`ch`).insertMany(chnews);
}

function cach(maxcach, length) {
  let khoangcach =
    "                                                                                                                                                                                   ";
  return khoangcach.substring(0, maxcach - length);
}

function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}

function restart() {
  let Heroku = require("heroku-client");
  let heroku = new Heroku({ token: "804a4899-5c3c-455e-859f-0c297d77767a" });
  heroku
    .delete("/apps/gtasanbot/dynos/web")
    .then((x) => console.log(x))
    .catch(() => restart());
}

async function LoadResources() {
  class Resource {
    #resourcesModules = null;
    #mainInterval = null;
    #resourcesName = null;

    constructor(resourcesName) {
      this.#resourcesModules = require(`./resources/${resourcesName}`);
      this.#resourcesName = resourcesName;
      Logger.info("Resources", `Load resource ${resourcesName} success!`);
    }

    reload = async () => {
      try {
        this.#resourcesModules = require(`./resources/${this.#resourcesName}`);
        Logger.info("Resources", `Reload resource ${resourcesName} success!`);
      } catch (err) {
        Logger.error(
          resourcesName,
          `Reload resource Failed with error : ${err}`
        );
      }
    };

    start = async () => {
      try {
        if (!this.#mainInterval) {
          Logger.info("Resources", `Starting resource ${this.#resourcesName}`);
          this.#mainInterval = setInterval(() => {
            try {
              this.#resourcesModules.main();
            } catch (err) {
              SendErrorLog(this.#resourcesName, err);
            }
          }, this.#resourcesModules.timeInterval);
          Logger.info(
            "Resources",
            `Start resource ${this.#resourcesName} Success`
          );
        } else
          Logger.warn(
            "Resources",
            `Can't start resource ${this.#resourcesName} already running`
          );
      } catch (err) {
        this.#mainInterval = null;
        SendErrorLog(this.#resourcesName, err);
      }
    };

    stop = async () => {
      try {
        if (this.#mainInterval) {
          Logger.info("Resources", `Stopping resource ${this.#resourcesName}`);
          await clearInterval(this.#mainInterval);
          this.#mainInterval = null;
          Logger.info(
            "Resources",
            `Stop resource ${this.#resourcesName} Success`
          );
        } else
          Logger.warn(
            "Resources",
            `Can't stop resource ${this.#resourcesName} already stopped`
          );
      } catch (err) {
        SendErrorLog(this.#resourcesName, err);
      }
    };

    IsRunning = () => {
      return !!this.#mainInterval;
    };
  }
  let resources = await fs.readdirSync("./resources");
  for (let i = 0; i < resources.length; i++) {
    try {
      Logger.info("Resources", `Found resource ${resources[i]} !`);

      if (resources[i].split(".js").length != 2) {
        Logger.warn("Resources", `Can't read resource ${resources[i]}`);
        continue;
      }

      let resourcesName = resources[i].split(".js")[0];

      if (resourcesMoudles[resourcesName]) {
        Logger.warn("Resources", `Resource ${resourcesName} already exists`);
        continue;
      }

      resourcesMoudles[resourcesName] = new Resource(resources[i]);

      if (config.resban.includes(resourcesName)) {
        Logger.warn("Resources", `Resource ${resources[i]} stopped by config!`);
        continue;
      }

      resourcesMoudles[resourcesName].start();
    } catch (err) {
      Logger.error(
        "Resources",
        `Loading resource ${resources[i]} Error: ${err}`
      );
    }
  }
}

async function GetDataServerFromCfx(cfx) {
  try {
    cfx = cfx.toLowerCase();
    let data = {};

    do {
      let res = await fetch(`https://cfx.re/join/${cfx}`);
      let ipdata = res.headers.get("x-citizenfx-url");

      if (!data.title) {
        let title = await res.text();
        title = title.slice(
          title.indexOf('<h1 title="') + '<h1 title="'.length
        );
        title = title.slice(0, title.indexOf('">'));
        data.title = title;
      }

      ipdata = ipdata.replace("http://", "");
      ipdata = ipdata.replace(/[^0-9.:]/g, "");
      ipdata = ipdata.split(":");
      ip = ipdata[0];
      port = ipdata[1];

      if (!ip || !port || ip.split(".").length != 4) {
        ipdata = res.headers.get("x-citizenfx-url");
        ipdata = ipdata.replace("http://", "");
        ipdata = ipdata.replace(`-${cfx}.users.cfx.re/`, "");
        data.usercfx = ipdata;
      } else {
        data.address = `${ip}:${port}`;
        data.ip = ip;
        data.port = port;
      }
    } while (!data.usercfx || !data.address);

    return data;
  } catch (err) {
    return { error: err };
  }
}
