const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require("../models/Register.js");
const settings = require("../settings.json");

exports.execute = async (client, message, args) => {

  if(!message.member.permissions.has(8)) if(!message.member.roles.cache.has(settings.kayıtSorumlusu)) return;

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let nick = args[1];
  let age = args[2];

  if(!user) return message.channel.send(`Kayıt edilecek bir üye belirtmelisin!`)
  if(!nick) return message.channel.send(`Kayıt edilecek üyeye bir isim belirtmelisin!`)
  if(age && isNaN(age)) return message.channel.send(`İsmi değiştirilecek üyeye belirtilen yaş bir sayı olmalıdır!`)
  
  await user.roles.add(settings.kızRolleri).catch(e => { });
  await user.roles.remove(settings.kayıtsızRolu).catch(e => { });
  await user.setNickname(`${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`).catch(e => { });
  
  let registerData = await Register.findOne({ guildId: message.guild.id, userId: user.id });
  let staffData = await Register.findOne({ guildId: message.guild.id, userId: message.author.id });
  let embed = new Discord.MessageEmbed().setTitle(`Kayıt İşlemi Başarılı`).setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));

  if(!staffData) {
    let newStaffData = new Register({
      _id: new mongoose.Types.ObjectId(),
      guildId: message.guild.id,
      userId: message.author.id,
      totalRegister: 1,
      womanRegister: 1,
      manRegister: 0,
      userNames: []
    }).save(); 
  } else {
    staffData.totalRegister++
    staffData.womanRegister++
    staffData.save();
  }
  if(!registerData) {
    let newRegisterData = new Register({
      _id: new mongoose.Types.ObjectId(),
      guildId: message.guild.id,
      userId: user.id,
      totalRegister: 0,
      womanRegister: 0,
      manRegister: 0,
      userNames: [{ nick: `${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `Kız`}]
    }).save();
  } else {
    registerData.userNames.push({ nick: `${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}`, type: `Kız`})
    registerData.save();
  }

  message.channel.send(embed.setDescription(`Kayıt Edilen Üye: ${user} \nVerilen Roller: ${settings.kızRolleri.map(x => `<@&${x}>`)} \nYeni İsmi: \`${nick.charAt(0).toUpperCase() + nick.slice(1).toLowerCase()}${age ? ` | ${age}` : ``}\``).setFooter(`Komutu Kullanan Yetkili: ${message.member.displayName} (${staffData ? staffData.totalRegister : 1} Toplam Kayıt)`))

};

exports.conf = {
  command: "kız",
  description: "Belirtilen üyenin kız olarak kaydetmeye yarar.",
  aliases: ["kadın", "woman", "k"]
}