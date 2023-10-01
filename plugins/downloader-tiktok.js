import { rejects } from 'assert'
import fetch from 'node-fetch'
import tiktokSrapper from 'tiktok-scraper'

let handler = async (m, { conn, usedPrefix, args, command, text }) => {
if (!text) throw `❓Linknya Mana?`
let loadd = [
 '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
 '《████▒▒▒▒▒▒▒▒▒》30%',
 '《███████▒▒▒▒▒▒》50%',
 '《██████████▒▒▒》70%',
 '《█████████████》100%',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]

let { key } = await conn.sendMessage(m.chat, {text: '_Loading_'})//Pengalih isu

for (let i = 0; i < loadd.length; i++) {
await conn.sendMessage(m.chat, {text: loadd[i], edit: key })}
try {
  // let res = await fetch(`https://api.xyroinee.xyz/api/downloader/tiktok?url=${text}&apikey=${global.xyro}`)
  // let json = await res.json()
  let cap = `Nih Kak >,<`
  // let anu = `*Nickname:* ${json.data.author.author}\n*Name:* ${json.data.author.author_name}`
  // await conn.sendMessage(m.chat, { video: { url: json.data.other_video_link[1] }, caption: cap }, { quoted: m })

  const option = {
    download: true,
    noWaterMark: true,
    hdVideo: true,
    filepath: './tmp/video.mp4',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.80 Safari/537.36',
      referer: 'https://www.tiktok.com/',
      cookie: 'tt_webid_v2=689854141086886123',
    },
    sessionList: [
      'msToken=adasdasfsadgadfsbsH0g=; Path=/; Domain=tiktok.com; Secure; Expires=2022-10-10T23:18:07.229Z;',
    ],
  };

  tiktokSrapper.getVideoMeta(text, option)
    .then((result) => {
      console.log(result)
      conn.sendMessage(m.chat, { video: "./tmp/video.mp4", caption: cap }, { quoted: m, mimetype: "video/mp4"})
    })
    .catch((err) => {
        console.log(err);
        m.reply('❗Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan');
      });
  } catch (e) {
    m.reply(`❗Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan ${text} ${e}`)
  }
  }
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i
handler.limit = true

export default handler