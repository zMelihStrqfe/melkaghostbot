const Discord = require("discord.js");
const database = require("quick.db");

exports.run = async (client, message, args) => {
  // can#0002
  if (message.author.id !== "760421959556792320") return;

  function gönderkardesim(content) {
    const infoEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(content)
      .setTimestamp()
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    return message.channel.send(infoEmbed);
  }

  const durum = await database.fetch(client.user.id);
  if (durum == true) {
    await database.delete(client.user.id);
    return gönderkardesim("Bakım artık sona erdi.");
  } else {
    await database.set(client.user.id, true);
    database.set(client.user.id + ":)", {
      author: message.author,
      time: Date.now()
    });

    return gönderkardesim(
      "Bakım modu açıldı.\nArtık hiç bir kimse komutları kullanamayacak."
    );
  }
};

exports.config = {
  name: "bakım", //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["bakım-modu"] //komutu farklı isimde çalıştırmak için
};
