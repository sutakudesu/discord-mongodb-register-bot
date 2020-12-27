const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require('../models/Register.js');
const settings = require("../settings.json");

exports.execute = async (client, message, args) => {

  if(!message.member.permissions.has(8)) if(!message.member.roles.cache.has(settings.kayıtSorumlusu)) return;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  
  let registerData = await Register.findOne({ guildId: message.guild.id, userId: user.id });
  let embed = new Discord.MessageEmbed().setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }));

  if(!registerData) {
    let newRegisterData = new Register({
      _id: new mongoose.Types.ObjectId(),
      guildId: message.guild.id,
      userId: user.id,
      totalRegister: 0,
      womanRegister: 0,
      manRegister: 0,
      userNames: []
    }).save().then(x => {
      return message.channel.send(embed.setDescription(`${user} Adlı üyenin ${registerData.userNames.length} isim kayıtı bulundu. \n\n${registerData.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `${settins.erkekRolleri[0]}`).replace(`Kız`, `${settins.kızRolleri[0]}`)})`)}`))
    });
  }

  message.channel.send(embed.setDescription(`${user} Adlı üyenin ${registerData.userNames.length} isim kayıtı bulundu. \n\n${registerData.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `<@&${settings.erkekRolleri[0]}>`).replace(`Kız`, `<@&${settings.kızRolleri[0]}>`)})`).join("\n ")}`))

};

exports.conf = {
  command: "isimler",
  description: "Belirtilen üyenin eski isim kayıtlarını görmeye yarar.",
  aliases: ["names", "nicks"]
}