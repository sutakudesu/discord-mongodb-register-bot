const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = global.client;
const Register = require("../models/Register.js");

exports.execute = async (member) => {
   
    let nameData = await Register.findOne({ guildId: member.guild.id, userId: member.id});

    if(!nameData) {
      let newNameData = new Register({
        _id: new mongoose.Types.ObjectId(),
        guildId: message.guild.id,
        userId: user.id,
        registerSize: 0,
        userNames: [{ nick: member.displayName, type: `Sunucudan Ayrılma`}]
      }).save();
    } else {
       nameData.userNames.push({ nick: member.displayName, type: `Sunucudan Ayrılma`})
       nameData.save();
    }

};

exports.conf = {
  event: "guildMemberRemove"
};