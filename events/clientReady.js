const Discord = require("discord.js");
const client = global.client;

exports.execute = async () => {
  
client.user.setPresence({ activity: { name: "Stark Register Project"}, status: "online" });

};

exports.conf = {
  event: "ready"
};
