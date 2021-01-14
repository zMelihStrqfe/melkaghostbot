let Discord = require("discord.js");
const { Client, Util } = require("discord.js");
const database = require("wio.db")
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  let prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    cmd.run(client, message, params);
  }
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if (command == "") return;
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor(`RED`)
          .setDescription(
            `» **${client.user.username}** adlı botta **` + command + `** adında komut bulunmamaktadır!\n» Yardım almak için **${prefix}yardım** komutunu kullanınız!`
          )
      );
    }
  }
  
  if(cmd && cmd.config.name !== 'bakım') {
  const neblmölçmedimikamk = require('wio.db').fetch(client.user.id);
  if(neblmölçmedimikamk == true) {
  var DURATION = require('humanize-duration');
  const chimped = database.fetch(client.user.id+':)');
  var TIMESTAMP = Date.now() - chimped.time;
  var RESULT = DURATION(TIMESTAMP, { language: 'tr', round: true, conjunction: ', ', serialComma: false });
  message.react('❌');
  return message.reply(`***${client.user.username}*** şu anda bakımda.\nYaklaşık ***${RESULT} önce*** bakıma alınmış.\nBakıma alan: ***${chimped.author.tag}***`);
  };
  };
};
