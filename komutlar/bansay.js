const Discord = require("discord.js");

const serverCooldown = new Set();

exports.run = async (client, message, args) => {
  
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine ihtiyacın var!`));
  
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
  
  let ghost = message.guild;
  ghost
    .fetchBans()
    .then(ghosT =>
    message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Sunucunuzda **${ghosT.size}** banlanmış üye bulunmaktadır!`))
  )
    .catch(console.error);
};

exports.config = {
  name: "bansay",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};