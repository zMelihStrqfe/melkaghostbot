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
    .setAuthor(`» ${client.user.username} | Davet Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .setDescription(`» **Tag** gibi bir çok sistemden yararlanmak için botumuzu davet ederseniz seviniriz!`)
    .addField(`» Davet Link:`, `[Tıkla!](https://discord.com/oauth2/authorize?client_id=797803769801736192&scope=bot&permissions=8)`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("GOLD");
  message.channel.send(discord)
  
};

exports.config = {
  name: "davet", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["davetet"] //komutu farklı isimde çalıştırmak için
};
