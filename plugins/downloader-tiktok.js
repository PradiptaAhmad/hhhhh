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
  let res = await fetch(`https://api.xyroinee.xyz/api/downloader/tiktok?url=${text}&apikey=${global.xyro}`)
  let json = await res.json()
  let cap = `Nih Kak >,<`
  let anu = `*Nickname:* ${json.data.author.author}\n*Name:* ${json.data.author.author_name}`
  // await conn.sendMessage(m.chat, { video: { url: json.data.other_video_link[1] }, caption: cap }, { quoted: m })
  tiktokSrapper.getVideoMeta(text).then((result) => {
    const downloadOptions = {
      noWaterMark: true, // Set to true to download without the watermark
      hdVideo: true, // Set to true to download in HD quality if available
    };
    return TikTokScraper.downloadVideo(videoMeta.collector[0], downloadOptions);
  })
  .then((video) => {
    conn.sednFile(m.chat, video, 'video.mp4', anu, m)
  })
  } catch (e) {
  m.reply(`❗Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan`)
  }
  }
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i
handler.limit = true

export default handler