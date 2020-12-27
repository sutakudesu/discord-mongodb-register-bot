const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require('../models/Register.js');
const settings = require("../settings.json");

exports.execute = async (client, message, args) => {

  if(!message.member.permissions.has(8)) if(!message.member.roles.cache.has(settings.kayıtSorumlusu)) return;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let nick = args[1];
  let age = args[2];

  if(!user) return message.channel.send(`İsmi değiştirilecek bir üye belirtmelisin!`)
  if(!nick) return message.channel.send(`İsmi değiştirilecek üyeye bir isim belirtmelisin!`)
  if(age && isNaN(age)) return message.channel.send(`İsmi değiştirilecek üyeye belirtilen yaş bir sayı olmalıdır!`)
  
  await user.setNickname(`${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`).catch();
  
  let registerData = await Register.findOne({ guildId: message.guild.id, userId: user.id });
  let embed = new Discord.MessageEmbed().setTitle(`İsim Değiştirme Başarılı`).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));

  if(!registerData) {
    let newRegisterData = new Register({
      _id: new mongoose.Types.ObjectId(),
      guildId: message.guild.id,
      userId: user.id,
      totalRegister: 0,
      womanRegister: 0,
      manRegister: 0,
      userNames: [{ nick: `${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `İsim Değiştirme`}]
    }).save();
  } else {
    registerData.userNames.push({ nick: `${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `İsim Değiştirme`})
    registerData.save();
  }

  message.channel.send(embed.setDescription(`İsmi Değiştirilen Üye: ${user} \nYeni İsmi: \`${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}\``).setFooter(`Komutu Kullanan Yetkili: ${message.member.displayName}`))

};

exports.conf = {
  command: "isim",
  description: "Belirtilen üyenin ismini değiştirmeye yarar.",
  aliases: ["name", "nick", "i"]
}