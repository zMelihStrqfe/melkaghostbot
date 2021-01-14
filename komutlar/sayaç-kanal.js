const Discord = require("discord.js");
const fs = require("fs");
var ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);

 const db = require("quick.db")

  if (args[0] === "kapat") {
    if (db.has(`sKanal_${message.guild.id}`) === true) {
      db.delete(`sKanal_${message.guild.id}`);

      if (db.has(`sayac_${message.guild.id}`) === true) {
        db.delete(`sayac_${message.guild.id}`);
        message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Sayaç kanalı ve sayaç başarıyla kaldırıldı!"));
        return;
      }

           message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Sayaç Kanalı kaldırıldı!"));
      return;
    }
    message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Sayaç kanalı ayarlanmamış!`));
    return;
  }

  let channel = message.mentions.channels.first();
  let prefix = process.env.PREFIX;

  if (!channel) {
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Lütfen ayarlamak istediğiniz kanalı etiketleyin!`));
    
  }


  db.set(`sKanal_${message.guild.id}`, channel.id);

  const embed = new Discord.MessageEmbed()
    .setDescription(`Sayaç kanalı başarıyla ayarlandı: ${channel}\nSayaç kanalını kapatmak isterseniz **${prefix}sayaç-kanal kapat** yazmanız yeterlidir.`
    )
    .setColor("GREEN")
    .setTimestamp()
  message.channel.send(embed);
};

exports.config = {
  name: "sayaç-kanal", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["sayaçç-kanal"] //komutu farklı isimde çalıştırmak için
};