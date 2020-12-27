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
        return message.channel.send(embed.addField(`❯ Kullanıcı Bilgisi`, `\`•\` Hesap: ${user} \n\`•\` Sunucu İsmi: ${user.displayName} \n\`•\` Kullanıcı ID: ${user.id}`).addField(`❯ Kayıt Bilgisi`, `\`•\` Toplam: ${x.totalRegister} \n\`•\` Erkek: ${x.manRegister} \n\`•\` Kız: ${x.womanRegister}`))
    });
  }

  message.channel.send(embed.addField(`❯ Kullanıcı Bilgisi`, `\`•\` Hesap: ${user} \n\`•\` Sunucu İsmi: ${user.displayName} \n\`•\` Kullanıcı ID: ${user.id}`).addField(`❯ Kayıt Bilgisi`, `\`•\` Toplam: ${registerData.totalRegister} \n\`•\` Erkek: ${registerData.manRegister} \n\`•\` Kız: ${registerData.womanRegister}`))

};

exports.conf = {
  command: "bilgi",
  description: "Belirtilen üyenin genel ve kayıt bilgilerini görmeye yarar.",
  aliases: ["info"]
}