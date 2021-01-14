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
  
     let unbanned = args[0];
  
  let ban = await message.guild.fetchBans();
  
  if (!unbanned) {
      let unbaninfoembed = new Discord.MessageEmbed()
        .setDescription(`» Yasağı kaldırmak için bir kişinin ID'sini gir!`)
      
        .setColor("RED");
      message.channel.send(unbaninfoembed);
    
    return;
    
  };
      if (!ban.get(unbanned)) {
      let notbannedembed = new Discord.MessageEmbed()
        .setDescription("» Bu kullanıcı zaten yasaklanmamış!")
        .setColor("RED");
      message.channel.send(notbannedembed);

      return;
    }

  
var user = ban.get(ban.id);
    message.guild.members.unban(unbanned);
  
    let discord = new Discord.MessageEmbed()
    .setAuthor(`» ${client.user.username} | UnBan Komutu`)
    .setTitle(`Discord Sunucumuz`)
    .setURL(`https://discord.gg/d7ezjuCQxK`)
    .addField(`» Yasağı Kaldırılan Kullanıcı:`, `<@!${unbanned}>`)
    .addField(`» Yasağı Kaldıran Kullanıcı:`, `<@${message.author.id}>`)
    .setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )
    .setColor("#11657d");
  message.channel.send(discord).then(a => a.delete({ timeout: 10000 }))
  message.delete();
  
};
  
  exports.config = {
  name: "unban",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["yasak-kaldır"],  //komutu farklı isimde çalıştırmak için 
};