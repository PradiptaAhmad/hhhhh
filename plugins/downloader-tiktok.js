import fetch from 'node-fetch';
import tiktokScraper from 'tiktok-scraper';

let handler = async (m, { conn, text }) => {
  if (!text) throw '❓Linknya Mana?';

  let loadd = [
    '《██▒▒▒▒▒▒▒▒▒▒▒》10%',
    '《████▒▒▒▒▒▒▒▒▒》30%',
    '《███████▒▒▒▒▒▒》50%',
    '《██████████▒▒▒》70%',
    '《█████████████》100%',
    '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...',
  ];

  let { key } = await conn.sendMessage(m.chat, { text: '_Loading_' }); // Pengalih isu

  for (let i = 0; i < loadd.length; i++) {
    await conn.sendMessage(m.chat, { text: loadd[i], edit: key });
  }

  try {
    let cap = `Nih Kak >,<`;

    const options = {
      download: true,
      noWaterMark: true,
      hdVideo: true,
    };

    tiktokScraper
      .getVideoMeta(text, options)
      .then((result) => {
        console.log(result);
        conn.sendFile(
          m.chat,
          result.collector[0].videoUrl,
          'video.mp4',
          cap,
          m,
          {
            mimetype: 'video/mp4',
          }
        );
      })
      .catch((err) => {
        console.log(err);
        m.reply(
          '❗Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan'
        );
      });
  } catch (e) {
    m.reply(
      `❗Terjadi Kesalahan, Tidak Dapat Mengambil Data Dari Url/Link Yang Kamu Masukan ${text} ${e}`
    );
  }
};

handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|ttdl|tiktokdl)$/i;
handler.limit = true;

export default handler;
