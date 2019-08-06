// Author: Sigulf#0308

const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = ".";
var roleUpdateSwitch;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  roleUpdateSwitch = true;
});

client.on('message', msg => {
    // Ignores messages by other bots
    if (msg.author.bot) return;

    if (msg.content == "." || msg.content == ". " || msg.toString().includes("...")) return;

    var rng = Math.floor((Math.random() * 500));
    if (rng == 250) {
        msg.react('😉');
    }

    if (msg.toString().includes('😉') || msg.toString().includes(';)')) {
        msg.react('😉');
    }
    
    // Ignores messages that don't start with its prefix
    if (msg.content.indexOf(prefix) !== 0 && !msg.isMentioned(client.user)) return;

    // Separation of command and arguments
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (msg.isMentioned(client.user)) {

        var fortunes = [client.emojis.find("name", "sigbut"), client.emojis.find("name", "forsenE"),
        client.emojis.find("name", "KYRAMOU"), client.emojis.find("name", "Worried5"), client.emojis.find("name", "FeelsSmugMan")];

        var rng = Math.floor(Math.random() * fortunes.length);
        if (fortunes[rng] != null) {
            msg.channel.send(`${fortunes[rng]}`);
        }
    }
    else if (command === 'help') {
        if (msg.channel.name != "botcommans") {
            var botcommands = msg.guild.channels.find("name", "botcommands");
            msg.channel.send(`${botcommands}`);
            return;
        }
        msg.channel.send("Sigbot - Λίστα Εντολών:");
        msg.channel.send("```1. .howmany <όνομα ρόλου> - Επιστρέφει πόσοι χρήστες παίζουν ένα παιχνίδι.\n2. .addrole <όνομα ρόλου> - Προσθέτει ρόλο παιχνιδιού.\n3. .removerole <όνομα ρόλου> - Αφαιρεί ρόλο παιχνιδιού.\n4. .roleupdater <on/off> - Ενεργοποιεί/Απενεργοποιεί την ανάθεση ρόλων. (Άρχοντες και Επίκουροι μόνο)\n5. .teleia - .\n6. .kollitos - :)\n7. .xodros - ;)```");

    }
    // howmany command: Returns a rich text of how many users have a specific role
    else if (command === 'howmany') {
        if (msg.channel.name != "botcommans") {
            var botcommands = msg.guild.channels.find("name", "botcommands");
            msg.channel.send(`${botcommands}`);
            return;
        }

        if (args.length == 0) {
            msg.channel.send("Χρήση: .howmany <ρόλος παιχνιδιού>");
        }
        else if (args.length == 1) {
            var gameArg = args.join(" ");
            var game = gameCheck(gameArg);

            var guild = msg.guild;

            if (game != "none" && game != null) {
                let membersWithRole = msg.guild.members.filter(member => {
                    return member.roles.find("name", `${game}`);
                }).map(member => {
                    return member.user.username;
                })

                let embed = new Discord.RichEmbed({
                    "title": `Ποιοι παίζουν ${game}`,
                    "description": membersWithRole.join("\n"),
                    "color": 0xFFFF
                });

                return msg.channel.send({ embed });
            }
        }
    }
    else if (command === 'kollitos' || command === 'kollite' && args.length == 0) {
        var fortunes = ["Αξίζει να σε βρουν νεκρό, κολλητέ. :)", "Αντε γαμήσου, κολλητέ. :)", "Να πεθάνεις σήμερα, κολλητέ. :)",
                        "Να δημιουργηθεί server χωρίς εσένα, κολλητέ. :)", "Θα σου γαμήσω τη μάνα, κολλητέ. :)",
                        "Τι θες ρε γαμημένε, κολλητέ; :)", "Γαμώ το χριστό σου, κολλητέ. :)"];
        var rng = Math.floor(Math.random() * fortunes.length);
        msg.channel.send(fortunes[rng]);
    }
    // Turns on and off role updating
    else if (command === 'roleupdater'){
        if (msg.channel.name != "botcommans") {
            var botcommands = msg.guild.channels.find("name", "botcommands");
            msg.channel.send(`${botcommands}`);
            return;
        }

        if (args.length == 0) {
            msg.channel.send("Χρήση: .roleupdater <on/off>");
        }
        else if (args.length == 1) {
            // Checks if user has "Manage Roles" permission before proceeding
            if (msg.channel.permissionsFor(msg.author).has("MANAGE_ROLES")) {
                if (args[0] == 'on') {
                    if (roleUpdateSwitch == false) {
                        roleUpdateSwitch = true;
                        msg.channel.send("Έναρξη ενημέρωσης ρόλων.");
                    }
                    else {
                        msg.channel.send("Οι ρόλοι ήδη ενημερώνονται.");
                    }
                }
                else if (args[0] == 'off') {
                    if (roleUpdateSwitch == true) {
                        roleUpdateSwitch = false;
                        msg.channel.send("Παύση ενημέρωσης ρόλων.");
                    }
                    else {
                        msg.channel.send("Η ενημέρωση ρόλων βρίσκεται ήδη σε παύση.");
                    }
                }
                else {
                    msg.channel.send("Χρήση: .roleupdater <on/off>");
                }
            }
            else {
                msg.channel.send("Απουσία αδειών διαχείρησης.");
            }
        }
    }
    else if (command === 'addrole') {
        if (msg.channel.name != "botcommans") {
            var botcommands = msg.guild.channels.find("name", "botcommands");
            msg.channel.send(`${botcommands}`);
            return;
        }

        if (args.length == 0) {
            msg.channel.send("Χρήση: .addrole <Όνομα Ρόλου>");
        }
        else if (args.length == 1) {
            var gameArg = args.join(" ");
            var game = gameCheck(gameArg);

            if (game != "none" && game != null) {
                let role;
                if (game.startsWith("Counter-Strike")) {
                    role = msg.guild.roles.find("name", "Counter Strike: Global Offensive")
                }
                else if (game.startsWith("PLAYERUNKNOWN'S BATTLEGROUNDS")) {
                    role = msg.guild.roles.find("name", "PUBG");
                }
                else {
                    role = msg.guild.roles.find("name", game);
                }
                let member = msg.guild.members.find("id", msg.author.id);
                var guild = member.guild;

                if (member.roles.has(role.id)) {
                    msg.channel.send(`Ήδη έχεις τον ρόλο ${role.name}.`);
                }
                else {
                    if (game.startsWith("Counter-Strike")) { // EX : Specific to Counter-Strike : Global Offensive, because it's too long to create a role with this name
                        if (guild.roles.find("name", "Counter Strike: Global Offensive") != null) {
                            member.addRole(guild.roles.find("name", "Counter Strike: Global Offensive"))
                                .then(function () {
                                    console.log(`Role: Counter-Strike given to ${member.user.username}`);
                                    msg.channel.send(`Ο ρόλος ${role.name} προστέθηκε.`);
                                }, function (e) {
                                    console.error(e);
                                });
                        }
                    }
                    else if (game.startsWith("PLAYERUNKNOWN'S BATTLEGROUNDS")) { // Specific to PUBG because the role name is not the game's actual name
                        if (guild.roles.find("name", "PUBG") != null) {
                            member.addRole(guild.roles.find("name", "PUBG"))
                                .then(function() {
                                    console.log(`Role: PUBG given to ${member.user.username}`);
                                    msg.channel.send(`Ο ρόλος ${role.name} προστέθηκε.`);
                                }, function (e) {
                                    console.error(e);
                                });
                        }
                    }
                    else if (guild.roles.find("name", game) != null) {
                        member.addRole(guild.roles.find("name", game)).then (function () {
                            console.log(`Role: ${game} given to ${member.user.username}`);
                            msg.channel.send(`Ο ρόλος ${role.name} προστέθηκε.`);
                        }, function (e) {
                            console.error(e);
                        });
                    }
                }
            }
            else {
                msg.channel.send("Μη έγκυρος ρόλος.");
            }
        }
    }
    else if (command === 'removerole') {
        if (msg.channel.name != "botcommans") {
            var botcommands = msg.guild.channels.find("name", "botcommands");
            msg.channel.send(`${botcommands}`);
            return;
        }
        
        if (args.length == 0) {
            msg.channel.send("Χρήση: .removerole <Όνομα Ρόλου>");
        }
        else if (args.length == 1) {
            var gameArg = args.join(" ");
            var game = gameCheck(gameArg);

            if (game != "none" || game != null) {
                let role;
                if (game.startsWith("Counter-Strike")) {
                    role = msg.guild.roles.find("name", "Counter Strike: Global Offensive")
                }
                else if (game.startsWith("PLAYERUNKNOWN'S BATTLEGROUNDS")) {
                    role = msg.guild.roles.find("name", "PUBG");
                }
                else {
                    role = msg.guild.roles.find("name", game);
                }
                let member = msg.guild.members.find("id", msg.author.id);
                var guild = member.guild;

                if (member.roles.has(role.id)) {
                    if (game.startsWith("Counter-Strike")) { // EX : Specific to Counter-Strike : Global Offensive, because it's too long to create a role with this name
                        if (guild.roles.find("name", "Counter Strike: Global Offensive") != null) {
                            member.removeRole(guild.roles.find("name", "Counter Strike: Global Offensive"))
                                .then(function () {
                                    console.log(`Role: Counter-Strike removed from ${member.user.username}`);
                                    msg.channel.send(`Ο ρόλος ${role.name} αφαιρέθηκε.`);
                                }, function (e) {
                                    console.error(e);
                                });
                        }
                    }
                    else if (game.startsWith("PLAYERUNKNOWN'S BATTLEGROUNDS")) { // Specific to PUBG because the role name is not the game's actual name
                        if (guild.roles.find("name", "PUBG") != null) {
                            member.removeRole(guild.roles.find("name", "PUBG"))
                                .then(function() {
                                    console.log(`Role: PUBG removed from ${member.user.username}`);
                                    msg.channel.send(`Ο ρόλος ${role.name} αφαιρέθηκε.`);
                                }, function (e) {
                                    console.error(e);
                                });
                        }
                    }
                    else if (guild.roles.find("name", game) != null) {
                        member.removeRole(guild.roles.find("name", game)).then (function () {
                            console.log(`Role: ${game} removed from ${member.user.username}`);
                            msg.channel.send(`Ο ρόλος ${role.name} αφαιρέθηκε.`);
                        }, function (e) {
                            console.error(e);
                        });
                    }
                }
                else {
                    msg.channel.send(`Δεν έχεις τον ρόλο ${role.name}.`);
                }
            }
            else {
                msg.channel.send("Μη έγκυρο όνομα παιχνιδιού.");
            }
        }
    }
    else if ((command === 'teleia' || command === '.') && args.length == 0) {
        msg.channel.send(".");
    }
    else if (command === 'xodros' && args.length == 0) {
        msg.reply("ΣΚΑΣΕ ΡΕ ΜΑΛΑΚΑ ΧΟΝΤΡΕ");
    }
});


// Role updater: give the role with the same name as the game played
client.on("presenceUpdate", (oldMember, newMember) => {

    if (roleUpdateSwitch == true) {

        // Name of guild
        var guild = newMember.guild;

        // On playing a new game
        if (newMember.user.presence.game) {

            // Get name of game
            var gamename = newMember.user.presence.game.name;

            if (gamename.startsWith("Counter-Strike")) { // EX : Specific to Counter-Strike : Global Offensive, because it's too long to create a role with this name
                if (guild.roles.find("name", "Counter Strike: Global Offensive") != null && (!oldMember.roles.find("name", "Counter-Strike Global Offensive"))) {
                    newMember.addRole(guild.roles.find("name", "Counter Strike: Global Offensive"))
                        .then(function () {
                            console.log(`Role: Counter-Strike given to ${newMember.user.username}`);
                        }, function (e) {
                            console.error(e);
                        });
                }
            }
            else if (gamename.startsWith("PLAYERUNKNOWN'S BATTLEGROUNDS")) { // Specific to PUBG because the role name is not the game's actual name
                if (guild.roles.find("name", "PUBG") != null && (!oldMember.roles.find("name", "PLAYERUNKNOWN'S BATTLEGROUNDS"))) {
                    newMember.addRole(guild.roles.find("name", "PUBG"))
                        .then(function() {
                            console.log(`Role: PUBG given to ${newMember.user.username}`);
                        }, function (e) {
                            console.error(e);
                        });
                }
            }
            else { // If a role "[name]" exists, gives it
                var newrole = guild.roles.find("name", `${gamename}`);
                if ((newrole) && (!oldMember.roles.find("name", `${gamename}`))) {
                    newMember.addRole(guild.roles.find("name", `${gamename}`))
                        .then(function () {
                            console.log(`Role: ${gamename} given to ${newMember.user.username}`);
                        }, function (e) {
                            console.error(e);
                        });
                }
            }
        }
    }
});

function gameCheck (gameArg) {
    var game = "none";

    if (gameArg.toLowerCase() == "br" || gameArg.toLowerCase() == "battlerite") { game = "Battlerite" } // Battlerite
    if (gameArg.toLowerCase() == "cs" || gameArg.toLowerCase() == "csgo" || gameArg.toLowerCase() == "cs:go" ||
        gameArg.toLowerCase() == "cs go" || gameArg.toLowerCase() == "counter strike global offensive" ||
        gameArg.toLowerCase() == "counter strike: global offensive" || gameArg.toLowerCase() == "counter-strike: global offensive" ||
        gameArg.toLowerCase() == "counter-strike global offensive") { game = "Counter Strike: Global Offensive" } // Counter-Strike
    if (gameArg.toLowerCase() == "ds3" || gameArg.toLowerCase() == "dark souls" || gameArg.toLowerCase() == "dark souls iii" || 
        gameArg.toLowerCase() == "dark souls 3") { game = "Dark Souls III" } // Dark Souls III
    if (gameArg.toLowerCase() == "dst" || gameArg.toLowerCase() == "don't starve") { game = "Don't Starve Together" } // Don't Starve Together
    if (gameArg.toLowerCase() == "fortnite") { game = "Fortnite" } // Fortnite
    if (gameArg.toLowerCase() == "gwent") { game = "Gwent" } // Gwent
    if (gameArg.toLowerCase() == "hs" || gameArg.toLowerCase() == "hearthstone") { game = "Hearthstone" } // Hearthstone
    if (gameArg.toLowerCase() == "hots" || gameArg.toLowerCase() == "heroes of the storm") { game = "Heroes of the Storm" } // Heroes of the Storm
    if (gameArg.toLowerCase() == "lol" || gameArg.toLowerCase() == "league" || gameArg.toLowerCase() == "league of legends") {
        game = "League of Legends" } // League of Legends
    if (gameArg.toLowerCase() == "minecraft") { game = "Minecraft" } // Minecraft
    if (gameArg.toLowerCase() == "ow" || gameArg.toLowerCase() == "overwatch") { game = "Overwatch" } // Overwatch
    if (gameArg.toLowerCase() == "pubg" || gameArg.toLowerCase() == "playerunknown's battlegrounds") { game = "PLAYERUNKNOWN'S BATTLEGROUNDS" } // PUBG
    if (gameArg.toLowerCase() == "terraria") { game = "Terraria" } // Terraria
    if (gameArg.toLowerCase() == "brawlhalla") { game = "Brawlhalla"} // Brawlhalla

    return game;
}

client.login('NDI2NDk2NzA5MTY2ODkxMDE5.DczceQ.Qba-82ZXoaFh0m-HMTZzAfGrRng');