const Discord = require("discord.js");
const config = require("../config.json");

exports.execute = async (message) => {
  
  let client = message.client;
  let prefix = config.Prefix.find(x => message.content.toLowerCase().startsWith(x))
  if (message.author.bot) return;
  if (!message.guild) return;

  if (prefix) {
    let args = message.content.substring(prefix.length).trim().split(" ")
    let command = args[0]

    args = args.splice(1);

    if (client.commands.has(command)) {
      client.commands.get(command).execute(client, message, args);
      
    } else if(client.aliases.has(command)) {
     client.aliases.get(command).execute(client, message, args);
      
    }
    return;
  }
};

exports.conf = {
    event: "message"
};