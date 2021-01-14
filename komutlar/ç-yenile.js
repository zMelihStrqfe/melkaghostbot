const ms = require('ms');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
const serverCooldown = new Set();
  
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

let messageID = args[0]
    if(!messageID){
        return message.channel.send('» bir çekiliş kimliği **belirtmelisin!**');
    }
client.giveawaysManager.reroll(messageID, {
    messages: {
        congrat: ":tada: Yeni kazanan(lar): {winners}! Tebrikler!",
        error: "» Geçerli katılım yok, kazanan seçilemez!"
                    }   
}).catch((err) => {
    message.channel.send("» `"+ messageID +"` için çekiliş bulamadım, lütfen kontrol edin ve tekrar deneyin");
})
}

exports.config = {
  name: "yenile",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};
