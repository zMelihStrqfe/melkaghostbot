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
    .setAuthor(`» ${client.user.username} | Yardım Menüsü`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» ${prefix}yetkili (\`8 Komut\`)`, `Yetkili Menüsünü açar!`)
  .addField(`» ${prefix}genel (\`7 Komut\`)`, `Genel Menüsünü açar!`)
  .addField(`» ${prefix}çekiliş (\`3 Komut\`)`, `Çekiliş Menüsünü açar!`)
  .addField(`» ${prefix}eğlence (\`10 Komut\`)`, `Eğlence Menüsünü açar!`)
  .addField(`» Notlar:`, `\`-\` Daha bir çok komut yakında sizlerle olucaktır!\n\`-\` [Destek sunucuma](https://discord.gg/d7ezjuCQxK) gelip <#794555546031489066> kanalını okuyunuz!\n\`-\` Botta hata varsa **${prefix}hata <hata>** şeklinde bildiriniz!\n\`-\` Bottaki toplam komut sayısı: **44**!`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
  .setColor("GOLD");
  message.channel.send(discord);
};

exports.config = {
  name: "yardım",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["y", "h", "help"],  //komutu farklı isimde çalıştırmak için 
};