const Discord = require('discord.js');

exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor(message.author + ' Koş Lan Koş Zayıflarsın.')
    .setColor(3447003)
    .setTimestamp()
    .setDescription('')
        .setImage(`https://media.giphy.com/media/4Ho3QLxhwS79EvRQM9/giphy.gif`)
    return message.channel.send(sunucubilgi);
    }
};
exports.config = {
  name: "koş",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};