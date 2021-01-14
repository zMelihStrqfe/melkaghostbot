const ms = require('ms');
const Discord = require('discord.js');

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
    if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.channel.send(
      new Discord.MessageEmbed() .setColor("RED") .setDescription("» Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine ihtiyacın var!"
    ));
  }

    if(!args[0]){
        return message.channel.send('» Bir çekiliş kimliği **belirtmelisin!**');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('» Sunucuda böyle bir çekiliş **bulunmuyor!** `'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('» Çekiliş kısa sürede bitecek, '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye bekleyin...').then(a => a.delete({timeout: 10000}));
    })
    .catch((e) => {
        if(e.startsWith(`:x: bu ID çekiliş kimliği ${giveaway.messageID} zaten bitti.`)){
            message.channel.send('» Bu çekiliş çoktan sona erdi!');
        } else {
            console.error(e);
            message.channel.send('» Bir hata oluştu...');
        }
    });

};

exports.config = {
  name: "bitir",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};
