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
    .setAuthor(`» ${client.user.username} | Çekiliş Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» ${prefix}başlat`, `Çekiliş başlatır!`)
  .addField(`» ${prefix}bitir`, `Çekilişi bitirir!`)
  .addField(`» ${prefix}yenile`, `Çekilişi yeniden çeker!`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "çekiliş",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["y-ç", "h-ç", "help-ç"],  //komutu farklı isimde çalıştırmak için 
};