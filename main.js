#!/usr/bin/env node
// above thing is used to make it global -> shebang syntax -> helps to run program in cli
let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organizeObj = require("./commands/organize");
let inputArr = process.argv.slice(2);
// console.log(inputArr);
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex', 'ppt', 'pptx'],
    app: ['exe', 'dmg', 'pkg', "deb"]
} 
let command = inputArr[0];

switch(command) {
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organieKey(inputArr[1]); 
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Input right command");
}


