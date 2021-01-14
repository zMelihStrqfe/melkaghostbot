const Discord = require("discord.js");

  const cevaplar = [
    "evet",
    "hayır",
    "belki",
    "olabilir",
    "daha sonra tekrar sor",
    "imkansız",
    "sanane lan yapram",
    "kes lan",
    "tmm api",
    "yapımcıma danış!",
    "adam ol",
    "adamı hasta etme ${message.author}!!",
    "yaw he!",
    "qwe!"
];

const serverCooldown = new Set();

exports.run = async (client, message, args) => {
  
      var soru = args.join('  ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if (!soru) return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» **8Ball**'ın cevaplaması için bir soru sor!`));

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

let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | 8Ball Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» Sorunuz:`,`**${soru}**`)
    .addField(`» Sana cevabım:`,`**${cevap}**`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    );
  message.channel.send(discord);
};

exports.config = {
  name: "8ball", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [] //komutu farklı isimde çalıştırmak için
};