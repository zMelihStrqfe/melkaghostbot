const Discord = require("discord.js"),
client = new Discord.Client();                //tanımlama yapabilirsiniz modül, dosya vs
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
  
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkisine ihtiyacın var!`));
  const melih = args.slice().join(' ')
   if (!melih) return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» Yazmam için bir şeyler belirt!`))
   message.channel.send(`${melih}`)
  message.delete();
};
exports.config = {
  name: "yaz",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};