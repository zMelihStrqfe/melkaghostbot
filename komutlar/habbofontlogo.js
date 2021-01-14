const Discord = require('discord.js');

exports.run = async (client, message, args) => {
     if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor(0xFF0000)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`**Lütfen yazı yazınız.** <a:maple_leaf:742698148329291826>`)
  const CrewCodeembed = `https://habbofont.net/font/habbo_new/${yazi}.gif`
  .replace(' ', '+')

  
  const embed = new Discord.MessageEmbed()
  .setTitle("Logo")
  .setColor("RANDOM")
  .setImage(CrewCodeembed)
  .setFooter('Habbo Font Logo Oluşturuldu')
  message.channel.send(embed)
}
exports.config = {
  name: "habbo", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["habbofontlogo"] //komutu farklı isimde çalıştırmak için
};
