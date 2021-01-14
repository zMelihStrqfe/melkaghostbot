const Discord = require("discord.js");
const moment = require("moment");
moment.locale("tr");
const serverCooldown = new Set();
exports.run = async (client, message, args, tools) => {
  
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
  
  
    let user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")

    .setThumbnail(user.avatarURL)

    .setTitle(`» **${user.username}#${user.discriminator}** Kullanıcı Bilgisi`)

    .addField("» İsim:", `${user.username}#${user.discriminator}`, true)
    .addField("» ID:", `${user.id}`, true)
    .addField("» Discord Tag:", `#${user.discriminator}`, true)
    .addField("» Hesap Oluşturma Tarihi:", `${moment.utc(user.createdAt).format('dddd, MMMM.Do.YYYY, ')}`, true)
    .addField("» Sunucuya Katılma Tarihi:", `${moment.utc(member.joinedAt).format('dddd, MMMM.Do.YYYY')}`, true)
    .addField("» Durumu:", `${user.presence.status}`, true)
    message.channel.send(embed);
    }


exports.config = {
  name: "kullanıcı-bilgi",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};
