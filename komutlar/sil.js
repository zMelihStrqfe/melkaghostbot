const Discord = require("discord.js");

const serverCooldown = new Set();

exports.run = async (client, message, args) => {
  
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkisine ihtiyacın var!`));
  
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

  let adet = args[0];

  if (!adet)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          "» Silinecek mesaj sayısını belirtmen gerek!"
        )
    );
  
    if (adet > 100) return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» \`100\`'den fazla mesaj silemem!`))
  
  if (adet < 1) return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» \`1\`'den az mesaj silemem!`))

  let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | Sil Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» Silinen Mesaj Adedi:`, `**${adet}**`)
    .addField(`» Silinen Mesaj Kanal:`, `<#${message.channel.id}>`)
    .addField(`» Silinen Mesaj Yetkili:`, `<@${message.author.id}>`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("GREEN");
  message.channel.send(discord).then(a => a.delete({ timeout: 10000 }));

  message.delete();
  message.channel.bulkDelete(adet);
};

exports.config = {
  name: "sil", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["temizle"] //komutu farklı isimde çalıştırmak için
};
