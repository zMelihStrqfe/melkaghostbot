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
    .setAuthor(`» ${client.user.username} | Gif Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
  .addField(`» ${prefix}gif-ara`, `Gif Ararsınız!`)
    .addField(`» ${prefix}gif-man`, `Man Gif Atar!`)
    .addField(`» ${prefix}gif-woman`, `Woman Gif Atar!`)
   .addField(`» ${prefix}gif-couple`, `Couple Gif Atar!`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "gif",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["g-g", "gi-g", "help-g"],  //komutu farklı isimde çalıştırmak için 
};