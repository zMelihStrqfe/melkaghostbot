const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const db = require("wio.db")
const client = new Discord.Client({
  autoReconnect: true
});
require("./util/Loader.js")(client);

const config = require('./ayarlar.json');
client.config = config;


let token = process.env.TOKEN;
let prefix = process.env.PREFIX;

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./database.json",
    updateCountdownEvery: 15000,
    default: {
        botsCanWin: false,
        embedColor: "#11657d",
        reaction: "🎉"
    }
});


client.on("ready", () => {
  console.log(
    `[BOT]: ${client.user.tag} ismiyle bağlandım!\n[BOT]: İyi kullanımlar!`
  );
  client.user.setPresence({
    activity: {
      name: `${prefix}yardım | #Ghost!`,
      link: "https://www.twitch.tv/zmelihstrqfee",
      type: "STREAMING"
    },
    status: "idle"
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  console.log(`[BOT]: ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
 console.log(`[BOT]: ${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

client.on("disconnected", () => {
  console.log("Bot discorda bağlanmayı reddeddi.");
  console.log("Yeniden başlatılıyor...");
  client.login(token);
});

client.on("message", message => {
  let prefix = process.env.PREFIX;
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "<@!797803769801736192>") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#11657d")
        .setDescription(
          `» Prefim/Ön ekim: \`${prefix}\`\n» Yardım için: \`${prefix}yardım\``
        )
    );
  }
});

client.on("message", message => {
  let prefix = process.env.PREFIX;
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "<@797803769801736192>") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#11657d")
        .setDescription(
          `» Prefim/Ön ekim: \`${prefix}\`\n» Yardım için: \`${prefix}yardım\``
        )
    );
  }
});

client.on("message", message => {
  const db = require("quick.dba");
  let tag = db.get(`tag_${message.guild.id}`);
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "tag") {
      if(!tag) {
      message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`» **${message.guild.name}** adlı sunucuda tag ayarlanmamış!`))
      return;
    }
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#11657d")
        .setDescription(
          `» **${message.guild.name}** adlı sunucunun tagı \`${tag}\`'dır!`
        )
    );
  }
});

client.on("message", async message => {
  if (!message.guild) return;

  if (db.has(`sayac_${message.guild.id}`) === true) {
    if (db.fetch(`sayac_${message.guild.id}`) <= message.guild.members.cache.size) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Tebrikler ${message.guild.name}!`)
        .setDescription(`Başarıyla \`${db.fetch(`sayac_${message.guild.id}`)}\` kullanıcıya ulaştık! Sayaç sıfırlandı!`)
        .setColor("RANDOM");
      message.channel.send(embed);
      message.guild.owner.send(embed);
      db.delete(`sayac_${message.guild.id}`);
    }
  }
});
client.on("guildMemberRemove", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucudan ayrıldı! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});
client.on("guildMemberAdd", async member => {
  const channel = db.fetch(`sKanal_${member.guild.id}`);
  if (db.has(`sayac_${member.guild.id}`) == false) return;
  if (db.has(`sKanal_${member.guild.id}`) == false) return;

    member.guild.channels.cache.get(channel).send(`**${member.user.tag}** Sunucuya Katıldı :tada:! \`${db.fetch(`sayac_${member.guild.id}`)}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) - member.guild.memberCount}\` üye kaldı!`);
});



client.login(token);
