const Discord = require('discord.js');



exports.run = async (client, message) => {
    let dönme = await message.channel.send({
        embed: {
            color: 0x00AE86,
            description: `${message.author} bir stres çarkı çevirdi!`,
            image: {
                url: "https://i.imgur.com/KJJxVi4.gif"
            }
        }
    });

    let bitiş = (Math.random() * (60 - 5 +1)) + 5;
    setTimeout(() => {
        dönme.edit({
            embed: {
                color: 0x00AE86,
                description: `${message.author}, stres çarkın **${bitiş.toFixed(2)}** saniye döndü.`
            }
        });
    }, 5 * 1000);
};  

exports.config = {
  name: "stres-çark",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: ["stresçark"],  //komutu farklı isimde çalıştırmak için 
};