const Discord = require("discord.js");
const db = require("quick.db")
let prefix = process.env.PREFIX;
exports.run = async (client, message, args) => {
  let kanal = message.mentions.channels.first();
  if (!kanal)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`» Lütfen bir kanal etiketle!`)
    );
  db.set(`uyarsunucu_${message.guild.id}`, kanal);
  let discord = new Discord.MessageEmbed()
    .setDescription(
      `» **Bu sunucunun Mod-Log kanalı <#${kanal.id}> olarak ayarlandı!**`
    )
    .setColor("GREEN");
  message.channel.send(discord);
};

exports.config = {
  name: "modlog",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};