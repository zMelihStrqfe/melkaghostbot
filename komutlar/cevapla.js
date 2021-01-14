const Discord = require("discord.js");

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
  
  let izinli = ["760421959556792320", "696407272145813505"];
  if (!izinli.includes(message.member.id))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("» Bu komuta erişimin yok!")
    );

  let prefix = process.env.PREFIX;

  let kisi = args[0];

  if (!kisi) {
    const embed = new Discord.MessageEmbed()

      .setColor("RED")
      .setDescription(`» Cevap gönderilcek kişinin ID'sini giriniz!`);

    return message.channel.send(embed);
  }

  let cevap2 = args.slice(1).join(" ");

  if (cevap2.length < 1) {
    const embed = new Discord.MessageEmbed()

      .setColor("RED")
      .setDescription(`» Cevabınızı yazınız!`);

    return message.channel.send(embed);
  }
  let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | Cevapla Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» Cevaplayan Yetkili:`, `<@${message.author.id}>`)
    .addField(`» Cevap:`, `${cevap2}`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("GOLD");
  if (client.users.cache.get(kisi).send(discord));

  let discord2 = new Discord.MessageEmbed()
    .setDescription(`İleti başarıyla gönderildi, kullanıcı yakında bakar!`)
    .setColor("#11657d");
  message.channel.send(discord2);
};

exports.config = {
  name: "cevapla", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [] //komutu farklı isimde çalıştırmak için
};
