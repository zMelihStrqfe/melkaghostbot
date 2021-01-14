const Discord = require("discord.js");

const db = require("quick.db")

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
  
      let banned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");
  
  if (!banned) {
      let baninfoembed = new Discord.MessageEmbed()
        .setDescription(`» Yasaklamak için bir kişi etiketle!`)
      
        .setColor("RED");
      message.channel.send(baninfoembed);
    
    return;
    
  };
      if (message.author === banned) {
      let sanctionyourselfembed = new Discord.MessageEmbed()
        .setDescription(`» Kendini yasaklayamazsın!`)
        .setColor("RED");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
      if (!reason) {
      let noreasonembed = new Discord.MessageEmbed()
        .setDescription(`» Bir sebep girmelisin!`)
        .setColor("RED");
      message.channel.send(noreasonembed);
  
      return;
    }
  
  message.guild.members.ban(banned, { reason: reason });
  
  let modlog = db.fetch(`modlogkanal.${message.guild.id}`)
    let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | Ban Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» Yasaklanan Kullanıcı:`, `${banned.tag}`)
    .addField(`» Yasaklayan Kullanıcı:`, `<@${message.author.id}>`)
    .addField(`» Yasaklanma Sebebi:`, `${reason}`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("#11657d");
message.channel.send(discord)
  message.delete();
  
};
  
  exports.config = {
  name: "ban",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["yasakla"],  //komutu farklı isimde çalıştırmak için 
};