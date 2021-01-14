const Discord = require("discord.js")
const ms = require("ms");

const client = new Discord.Client();                //tanımlama yapabilirsiniz modül, dosya vs
const serverCooldown = new Set();
exports.run = async (client, message, args) => {
  
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
  if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.channel.send(
      new Discord.MessageEmbed() .setColor("RED") .setDescription("» Bu komutu kullanabilmek için `Mesajları Yönet` yetkisine ihtiyacın var!"
    ));
  }

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» Lütfen, çekiliş malzemesi, süresi ve kazanan sayısını belirtin!\n» Örn: \`${prefix}başlat 10m 1 Discord Nitro\``));
    }

    // Number of winners
    let giveawayNumberWinners = args[1];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» Lütfen, çekiliş malzemesi, süresi ve kazanan sayısını belirtin!\n» Örn: \`${prefix}başlat 10m 1 Discord Nitro\``));
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(new Discord.MessageEmbed() .setColor("RED") .setDescription(`» Lütfen, çekiliş malzemesi, süresi ve kazanan sayısını belirtin!\n» Örn: \`${prefix}başlat 10m 1 Discord Nitro\``));
    }

    // Start the giveaway
    client.giveawaysManager.start(message.channel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+":tada: **ÇEKİLİŞ BAŞLADI** :tada:",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+":tada: **ÇEKİLİŞ BİTTİ** :tada:",
            timeRemaining: "Kalan süre: **{duration}**!",
            inviteToParticipate: "Katılmak için 🎉 emojisine bas!",
            winMessage: "» Tebrikler, {winners}! **{prize}** ödülünü kazandınız!",
            embedFooter: "",
            noWinner: "Yetersiz katılım!",
            hostedBy: "Başlatan: {user}",
            winners: "kazanan(lar)",
            endedAt: "Bitiş",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün",
                weeks: "hafta",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });
  message.delete();

};

exports.config = {
  name: "başlat",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};
