const Discord = require('discord.js');
exports.run = (client, message, args) => {
if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  let isim = args.slice(0).join("+")
  if(!isim)return message.channel.send("**Lütfen Bişey Yaz.** :maple_leaf:")
let link = "https://dynamic.brandcrowd.com/asset/logo/2fa9614c-e8fd-47be-b522-14aa07bd8f22/logo?v=4&text="+isim
  const Messageembed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setImage(link)
  message.channel.send(Messageembed)
};
exports.config = {
  name: "cool",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["logocool","coollogo","logo-cool"],  //komutu farklı isimde çalıştırmak için 
};
