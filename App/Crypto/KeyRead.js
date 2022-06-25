const fs= require('fs');
const path = require('path');

async function readPbKey(){
    fs.openSync(path.join(__dirname,"..","Keys","PbKey.pem"),"r");
    var publicKey=fs.readFileSync(path.join(__dirname,"..","Keys","PbKey.pem"),"utf8");
    return publicKey;
}
async function readPvKey(){
    fs.openSync(path.join(__dirname,"..","Keys","PvKey.pem"),"r");
    var privateKey=fs.readFileSync(path.join(__dirname,"..","Keys","PvKey.pem"),"utf8");
    return privateKey;
}
module.exports.readPbKey=readPbKey;
module.exports.readPvKey=readPvKey;