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
    .setAuthor(`» ${client.user.username} | Eğlence Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
  .addField(`» ${prefix}8ball`, `8Ball'a soru sorarsın!`)
    .addField(`» ${prefix}yılbaşı`, `Yılbaşına Kaç Gün Olduğunu Öğrenirsin!`)
    .addField(`» ${prefix}koş`, `Koşarsınız!`)
    .addField(`» ${prefix}kaçcm`, `Kaç Cm Olduğunu Öğrenirsin xd !`)
      .addField(`» ${prefix}stresçark`, `Stres Çarkı Çevirirsin !`)
        .addField(`» ${prefix}balık-tut`, `Balık Tutarsınız !`)
      .addField(`» ${prefix}bayrak`, `Ne Mutlu Türküm Diyene !`)
    .addField(`» ${prefix}kartopu`, `Etiketlediğin Kişiye Kartopu Atarsın!`)
     .addField(`» ${prefix}slots`, `Slots Oyununu Oynarsın !`)
   .addField(`» ${prefix}söv`, `Etiketlediğin Kişiye Söversin Şaka Amaçlıdır !`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "eğlence",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["y-e", "h-e", "help-e"],  //komutu farklı isimde çalıştırmak için 
};