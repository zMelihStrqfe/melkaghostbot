const Discord = require("discord.js");
const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const serverCooldown = new Set();

exports.run = async (client, message, args) => {
  let prefix = process.env.PREFIX;

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

  let sürüm = `v0.1 BETA`;

  let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | İstatistik Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(
      `» Çalışma Süresi:`,
      `${moment
        .duration(client.uptime)
        .format("D [gün], H [saat], m [dakika], s [saniye]")}`
    )
    .addField(`» Ping:`, `${client.ws.ping} ms`, true)
    .addField(`» Sunucular:`, `${client.guilds.cache.array().length}`, true)
    .addField(
      `» Kullanıcılar:`,
      `${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}`,
      true
    )
    .addField(`» Kanallar:`, `${client.channels.cache.array().length}`, true)
    .addField(`» Sürüm:`, `${sürüm}`, true)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("#11657d");
  message.channel.send(discord);
};

exports.config = {
  name: "istatistik", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["i", "s", "stats"] //komutu farklı isimde çalıştırmak için
};
