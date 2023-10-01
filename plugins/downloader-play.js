import yts from 'yt-search';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

// Define a variable to store the download URL
let downloadUrl = '';

const ytIdRegex =
  "/(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:watch\?.*(?:|\&)v=|embed\/|v\/)|youtu\.be\/)([-_0-9A-Za-z]{11})/";

var handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw 'Judulnya?';
  m.reply(wait);

  try {
    // Search for videos based on the user's query
    let search = await yts(text);
    if (!search.videos.length) throw 'Tidak Ditemukan';

    // Select a random video from the search results
    let vid = search.videos[Math.floor(Math.random() * search.videos.length)];
    let { title, thumbnail, timestamp, views, ago, url } = vid;

    let captvid = `╭──── 〔 𝗬 𝗢 𝗨 𝗧 𝗨 𝗕 𝗘 〕
• 𝗝𝘂𝗱𝘂𝗹: ${title}
• 𝗗𝘂𝗿𝗮𝘀𝗶: ${timestamp}
• 𝗩𝗶𝗲𝘄𝘀: ${views}
• 𝗨𝗽𝗹𝗼𝗮𝗱: ${ago}
• 𝗟𝗶𝗻𝗸: ${url}
⏳𝗠𝘂𝘀𝗶𝗸 𝗱𝗮𝗹𝗮𝗺 𝗽𝗲𝗻𝗴𝗶𝗿𝗶𝗺𝗮𝗻,
𝗺𝗼𝗵𝗼𝗻 𝘁𝘂𝗻𝗴𝗴𝘂 𝗵𝗶𝗻𝗴𝗴𝗮 𝘀𝗲𝗹𝗲𝘀𝗮𝗶.
╰────────⬣`;

    conn.sendMessage(
      m.chat,
      { image: { url: thumbnail }, caption: captvid },
      m
    );

    // Call the yta function to retrieve the download link
    const audioInfo = await yta(url);

    // Set the download URL
    downloadUrl = audioInfo.dl_link;

    // Prepare the document to send as a response
    let doc = {
      audio: {
        url: downloadUrl,
      },
      mimetype: 'audio/mp4',
      fileName: `${title}`,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          mediaType: 2,
          mediaUrl: url,
          title: title,
          body: wm,
          sourceUrl: url,
          thumbnail: await (await conn.getFile(thumbnail)).data,
        },
      },
    };

    // Send the audio document as a response
    conn.sendMessage(m.chat, doc, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply(error);
  }
};

// Rest of the code remains unchanged...

// function yta(url) {
//   return new Promise((resolve, reject) => {
//     if (ytIdRegex.test(url)) {
//       let ytId = ytIdRegex.exec(url);
//       url = 'https://youtu.be/' + ytId[1];
//       post('https://www.y2mate.com/mates/en60/analyze/ajax', {
//         url,
//         q_auto: 0,
//         ajax: 1,
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           let document = new JSDOM(res.result).window.document;
//           let type = document.querySelectorAll('td');
//           let aww = Object.fromEntries(
//             [...document.querySelectorAll('td > a[href="#"]')]
//               .filter((v) => !/\.3gp/.test(v.innerHTML))
//               .map((v) => [
//                 v.innerHTML.match(/.*?(?=\()/)[0].trim(),
//                 v.parentElement.nextSibling.nextSibling.innerHTML,
//               ])
//           );
//           let filesize = aww['.mp3'];
//           let id = /var k__id = "(.*?)"/.exec(document.body.innerHTML) || [
//             '',
//             '',
//           ];
//           let thumb = document.querySelector('img').src;
//           let title = document.querySelector('b').innerHTML;

//           post('https://www.y2mate.com/mates/en60/convert', {
//             type: 'youtube',
//             _id: id[1],
//             v_id: ytId[1],
//             ajax: '1',
//             token: '',
//             ftype: 'mp3',
//             fquality: 128,
//           })
//             .then((res) => res.json())
//             .then((res) => {
//               let KB = parseFloat(filesize) * (1000 * /MB$/.test(filesize));
//               resolve({
//                 dl_link: /<a.+?href="(.+?)"/.exec(res.result)[1],
//                 thumb,
//                 title,
//                 filesizeF: filesize,
//                 filesize: KB,
//               });
//               downloadUrl = res.result;
//             })
//             .catch(reject);
//         })
//         .catch(reject);
//     } else reject('URL INVALID');
//   });
// }

// function post(url, formdata) {
//   INFOLOG(
//     Object.keys(formdata)
//       .map((key) => `${key}=${encodeURIComponent(formdata[key])}`)
//       .join('&')
//   );
//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       accept: '*/*',
//       'accept-language': 'en-US,en;q=0.9',
//       'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
//     },
//     body: Object.keys(formdata)
//       .map((key) => `${key}=${encodeURIComponent(formdata[key])}`)
//       .join('&'),
//   });
// }

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^play?$/i;

handler.exp = 0;
handler.limit = true;
handler.register = false;

export default handler;
