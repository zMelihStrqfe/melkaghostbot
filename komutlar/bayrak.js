const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
          file:"https://media.giphy.com/media/yDm4Ry6XU77Py/giphy.gif",
          color: 0xD97634,
          description: "**:flag_tr: Türk bayrağı !**"
            }});
};

exports.config = {
  name: "bayrak",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};