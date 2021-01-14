const request = require("request-promise-native");
const Discord = require("discord.js");

exports.run = async (Bastion, message, args) => {
  try {
    if (args.length < 1) {
      const embed = new Discord.MessageEmbed()

        .setColor("RED")
        .setDescription(":x:**Doğru Kullanım: xyz!gif-ara <aranacak gif>**");

      return message.channel.send(embed);
    }

    let options = {
      url: "http://api.giphy.com/v1/gifs/search",

      qs: {
        q: encodeURI(args.join("+")),

        api_key: "dc6zaTOxFJmzC",

        limit: 10,

        offset: 0
      },

      json: true
    };

    let response = await request(options);

    if (response.data.length) {
      const embed = new Discord.MessageEmbed()

        .setColor("GREEN")
        .setDescription(`**Gif Aranıyor :** ${args.join(" ")}`.slice(0, 256))
        .setImage(
          response.data[Math.floor(Math.random() * response.data.length)].images
            .original.url
        );

      return message.channel.send(embed);
    } else {
      return Bastion.emit(
        "Hata",
        "",
        Bastion.i18n.error(message.guild.language, "Bulunamadı", "Görsel"),
        message.channel
      );
    }
  } catch (e) {
    if (e.response) {
      return Bastion.emit(
        "Hata",
        e.response.statusCode,
        e.response.statusMessage,
        message.channel
      );
    }

    console.log(e);
  }
};

exports.config = {
  name: "gif-ara",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};