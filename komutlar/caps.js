const Discord = require('discord.js');
const db = require("quick.db")

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
 if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» Bu komutu kullanabilmek için \`Sunucuyu Yönet\` yetkisine ihtiyacın var!`));

if(!args[0]) return message.channel.send(nn.setColor('#00001').setTitle('Bir hata oldu!').setDescription(`Caps Lock kısıtmak istersen **xyz!caps kısıt** yazmalısın.`))
if(args[0] === 'kısıt') {
db.set(`caps.${message.guild.id}`, true);
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor("GREEN").setDescription('» Büyük harf kısıtlaması başarıyla açıldı.')).then(a => a.delete({timeout: 10000}));
} else if(args[0] === 'kapat') {
db.delete(`caps.${message.guild.id}`);
return message.channel.send(nn.setTitle('İşte bu kadar!').setDescription('» Büyük harf kısıtlaması başarıyla kapatıldı.')).then(a => a.delete({timeout: 10000}));
}
};

exports.config = {
  name: "caps", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [] //komutu farklı isimde çalıştırmak için
};
