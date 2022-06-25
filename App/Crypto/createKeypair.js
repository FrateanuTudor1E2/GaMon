const crypto= require('crypto');
const fs= require('fs');
const path = require('path');

function genKeyPair(){
    const keyPair= crypto.generateKeyPairSync('rsa',{ 
        modulusLength: 4096,
        publicKeyEncoding:{
            type:'pkcs1',
            format:'pem'
        },
        privateKeyEncoding:{
            type: 'pkcs1',
            format:'pem',
        }
    });
   
    fs.openSync(path.join(__dirname,"..","Keys","PbKey.pem"),"w");
    fs.writeFileSync(path.join(__dirname,"..","Keys","PbKey.pem"),keyPair.publicKey,"utf8");
    fs.openSync(path.join(__dirname,"..","Keys","PvKey.pem"),"w");
    fs.writeFileSync(path.join(__dirname,"..","Keys","PvKey.pem"),keyPair.privateKey,"utf8");
}

module.exports.genKeyPair=genKeyPair;



