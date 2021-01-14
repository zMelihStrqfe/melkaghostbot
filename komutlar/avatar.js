const Discord = require("discord.js");
const serverCooldown = new Set();

exports.run = async (client, message, args) => {
  

let prefix = process.env.PREFIX;
  
  let user = message.mentions.users.first() || message.author;

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
    .setAuthor(`» ${client.user.username} | Avatar Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .setDescription(`[[PNG]](${user.displayAvatarURL({ format: 'png', size: 1024 })}) | [[JPEG]](${user.displayAvatarURL({ format: 'jpeg', size: 1024 })}) | [[GIF]](${user.displayAvatarURL({ format: 'gif', size: 1024 })}) | [[WEBP]](${user.displayAvatarURL({ format: 'webp', size: 1024 })}) | [[JPG]](${user.displayAvatarURL({ format: 'jpg', size: 1024 })})\n» Avatar:`)
    .setImage(user.displayAvatarURL({dynamic:true}))
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("GOLD");
  message.channel.send(discord)
  
};
exports.config = {
  name: "avatar",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["pp"],  //komutu farklı isimde çalıştırmak için 
};