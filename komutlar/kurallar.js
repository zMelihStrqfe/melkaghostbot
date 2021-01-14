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
  
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Sunucuyu Yönet\` yetkisine ihtiyacın var!`));
  

let user = message.mentions.users.first() || message.author

const exampleEmbed = new Discord.MessageEmbed()
 .setColor("RANDOM")
 .setAuthor(`» ${message.guild.name}`, message.guild.iconURL())
 .setDescription(`• Kurallar •

Reklam
• Sözlü reklamlar, link ile reklam, özelden reklam, resim ile reklam ve benzeri şekilde reklamlar yapmak yasaktır.

Küfür, Argo, Hakaret
• Her kanalda küfür etmek ve argo kullanmak yasaktır.
• Üyelere karşı hakaret etmek ve dalga geçme yasaktır.

Yetkililer ve Yetki
• Yetki istemek yasaktır.
• Yetkili alımları ile ilgili soru sormak yasaktır.
• Yetkilileri boş yere @etiketlemek ve @etiketleyerek spam yapmak yasaktır.
• Yetkililere saygılı olun.

Spam, Flood, Etiketleme
• Spam yapmak yasaktır.
• Bir kelimeyi sürekli bir mesajda yazmak yasaktır.
• Flood yapmak alt alta yazmak yasaktır.
• Bir üyeyi sürekli @etiketlemek yasaktır.

Din, Siyaset, Cinsellik
• Din ile ilgili konuşmak, tartışmak, kullanıcı adlarını din ile ilgili koymak yasaktır.
• Siyaset ile ilgili konuşmak, tartışmak, kullanıcı adlarını siyaset ile ilgili koymak yasaktır.
• 18+ fotoğraflar paylaşmak ve konuşmak yasaktır.

Kavga, Tartışmak
• Kavga etmek, kavgaya dahil olmak ve tartışmak yasaktır.
• Herhangi bir sorununuz varsa yetkiliye danışınız.`)
  message.channel.send(exampleEmbed)


}

exports.config = {
  name: "kurallar",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};