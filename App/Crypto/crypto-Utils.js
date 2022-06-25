const crypto= require('crypto');
function randomId(){
return crypto.randomInt(0,1000000);
}
function hashPasswordSalt(password,salt){
    let hashPassword= crypto.pbkdf2Sync(password,salt,1000,64,`sha512`).toString(`hex`);
     let hash={'hashPassword': hashPassword, 'salt':salt};
     return hash;
}

function hashPassword(password){
     let salt= crypto.randomBytes(16).toString('hex');
     let hashPassword= crypto.pbkdf2Sync(password,salt,1000,64,`sha512`).toString(`hex`);
     let hash={'hashPassword': hashPassword, 'salt':salt};
     return hash;
}

module.exports={
    randomId,
    hashPassword,
    hashPasswordSalt
}