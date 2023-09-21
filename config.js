import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

// Owner
global.owner = [
['6285156241839', 'Bajurichh', true],
]
global.mods = []
global.prems = []
// Info
global.nomorwa = '6283897387848'
global.packname = '© Sticker by'
global.author = 'Adip Whatsapp'
global.namebot = 'Konz - MD'
global.wm = '© KonzBot Whatsapp'
global.stickpack = '© Sticker by'
global.stickauth = 'WinTheBot'
global.fotonya =
  'https://img.freepik.com/premium-photo/anime-woman-portrait-manga-style-cartoon-illustration_691560-3925.jpg?w=2000';
global.fotonya2 = `https://telegra.ph/file/6f49668f7fe0d837bf8ab.jpg`
// Link Sosmed
global.sig = 'https://instagram.com/PradiptaAhmad'
global.syt = 'https://youtube.com/@jessnolimit'
global.sgh = 'https://github.com/PradiptaAhmad'
global.sgc = 'https://chat.whatsapp.com/Ksg1HJO2wSsEBUXUhulWun'
// Donasi

global.psaweria = 'Udah Sugeh'
global.ptrakterr = 'Udah Kaya'
global.povo = '085156241839'
// Info Wait
global.wait = 'Loading...'
global.eror = 'Terjadi Kesalahan Coba Lagi Nanti!'
global.multiplier = 69 
// Apikey
global.lol = 'SGWN'
global.rose = 'Rs-putangina'
global.xyro = 'ClaraKeyOfficial'
// Catatan : Jika Mau Work Fiturnya
// Masukan Apikeymu
// Gapunya Apikey? Ya Daftar
// Website: https://api.xyroinee.xyz
// Daftar Ke Website Tersebut Untuk
// Mendapatkan Apikey Kamu
global.APIs = {
    xyro: "https://api.xyroinee.xyz",
    popcat : 'https://api.popcat.xyz'
}
/*Apikey*/
global.APIKeys = {
    "https://api.xyroinee.xyz": "ClaraKeyOfficial",
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
