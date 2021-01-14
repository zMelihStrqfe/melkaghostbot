const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
  const db = require("quick.db");

  let prefix = process.env.PREFIX;
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Sunucuyu Yönet\` yetkisine ihtiyacın var!`));

  if (!args[0]) {
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Lütfen ayarlamak istediğiniz sayıyı yazınız!"));
  }

  if (args[0] === "kapat") {
    if (db.has(`sayac_${message.guild.id}`) === true) {
      db.delete(`sayac_${message.guild.id}`);

      if (db.has(`sKanal_${message.guild.id}`) === true) {
        db.delete(`sKanal_${message.guild.id}`);
        message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Sayaç kanalı ve sayaç başarıyla kaldırıldı!"));
        return;
      }

      message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Sayaç kaldırıldı!"));
      return;
    }
    message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Sayaç ayarlanmamış!`));
    return;
  }

  if (isNaN(args[0])) {
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("» Sadece sayı!"));
  }

  if (args[0] <= message.guild.memberCount) {
    const embed = new Discord.MessageEmbed();
    return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription("»  Lütfen sunucu sayısından daha yüksek bir değer girin!" ));
  }

  db.set(`sayac_${message.guild.id}`, args[0]);

  const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setDescription(`
Sayaç başarıyla ayarlandı: **${args[0]}**
Sayaç kapatmak isterseniz **${prefix}sayaç kapat** yazmanız yeterlidir.
Sayaç kanalı için ${prefix}sayaç-kanal-ayarla #kanal
`)
  .setColor("GREEN");
  message.channel.send(embed);
};

exports.config = {
  name: "sayaç", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["sayaçç"] //komutu farklı isimde çalıştırmak için
};
