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
    .setAuthor(`» ${client.user.username} | Yetkili Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» ${prefix}sil`, `Belirttiğiniz kadar mesaj siler!`)
  .addField(`» ${prefix}bansay`, `Sunucuda kaç banlanan varsa sayısını gösterir!`)
  .addField(`» ${prefix}ban`, `Belirt kullanıcıyı sebebiyle sunucudan yasaklar!`)
  .addField(`» ${prefix}unban`, `Belirtilen ID'deki kullanıcının yasağını kaldırır!`)
  .addField(`» ${prefix}yaz`, `Belirtilen şeyi yazar!`)
  .addField(`» ${prefix}kurallar`, `Boşuna kuralları yazmanıza gerek yok bu komutla tık diye yazarsınız!`)
  .addField(`» ${prefix}nuke`, `Yazdığınız kanalı bombalarsınız!`)
  .addField(`» ${prefix}tag`, `Sunucunuzda tag ayarlarsınız!`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "yetkili",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["y-y", "h-y", "help-y"],  //komutu farklı isimde çalıştırmak için 
};