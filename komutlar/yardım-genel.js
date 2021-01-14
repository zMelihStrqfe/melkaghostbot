const Discord = require("discord.js");

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

  let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | Genel Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» ${prefix}istatistik`, `Botun istatistiğine bakarsın!`)
  .addField(`» ${prefix}ping`, `Botun pingine bakarsın!`)
  .addField(`» ${prefix}yılbaşı`, `Yılbaşına kaç gün, kaç saat ve kaç dakika kaldı öğrenirsin!`)
   .addField(`» ${prefix}hata`, `Botta olan hatayı bildirirsiniz!`)
  .addField(`» ${prefix}kullanıcı-bilgi`, `Kullanıcı bilginize veya başkasınınkine bakarsınız!`)
  .addField(`» ${prefix}davet`, `Botu davet etmek için linki alırsınız!`)
  .addField(`» ${prefix}avatar`, `Avatarına bakarsın!`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "genel",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["y-g", "h-g", "help-g"],  //komutu farklı isimde çalıştırmak için 
};