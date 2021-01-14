const Discord = require("discord.js");
let prefix = process.env.PREFIX;
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
  
  let type = args.slice(0).join(" ");
  if (type.length < 1) {
    const embed = new Discord.MessageEmbed()

      .setColor("RED")
      .setDescription(`» Botta bulduğunuz hatayı yazın!`);

    return message.channel.send(embed);
  }

  const embed = new Discord.MessageEmbed()

    .setColor("#11657d")
    .setDescription(
      "» İletiniz başarıyla alınmıştır, geri cevap için bot yoluyla özelden mesaj gönderilir!"
    );

  message.channel.send(embed);

  const embed2 = new Discord.MessageEmbed()

    .setColor("GREEN")

    .addField(
      `:envelope: **Gönderen Kişinin Bilgileri:**`,
      `:white_small_square: Kullanıcı ID: **${message.author.id}**\n:white_small_square: Kullanıcı Adı: **${message.author.username}**\n:white_small_square: Kullanıcı Tagı: **#${message.author.discriminator}**`
    )
    .addField(":pencil: **Gönderilen Hata/Bug Mesajı:**", `:white_small_square: __${type}__`)
  .addField(":incoming_envelope: **Yetkili Bölümü:** (`Yakında!`)", `:white_small_square: \`${prefix}cevapla <kullanıcı_id> <cevap>\``)

    .setThumbnail(message.author.avatarURL);

  client.channels.cache.get("794553571559342121").send(embed2);
};

exports.config = {
  name: "hata", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["hata-bildir", "hata-bildir"] //komutu farklı isimde çalıştırmak için
};
