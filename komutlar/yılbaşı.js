const Discord = require("discord.js");
const ms = require("parse-ms");
const serverCooldown = new Set();
exports.run = async (client, message, args) => {
  
      if (serverCooldown.has(message.guild.id)) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `» **${client.user.username}** adlı bottan tekrar komut kullanabilmek için \`5 Saniye\` beklemen gerek!`
        )
    );
  }
    serverCooldown.add(message.guild.id);
  setTimeout(() => {
    serverCooldown.delete(message.guild.id);
  }, 300);
  
  let okul = new Date("2022-01-01 00:00:00");
  let zaman = ms(okul - Date.now());

  let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | Yılbaşı Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
  .addField(`» Yılbaşına kalan süre:`, `**${zaman.days}** gün **${zaman.hours}** saat **${zaman.minutes}** dakika **${zaman.seconds}** saniye`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("#11657d");
  message.channel.send(discord)
};

exports.config = {
  name: "yılbaşı", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [] //komutu farklı isimde çalıştırmak için
};
