const cookie = require('cookie');
const crypto= require('crypto');
const { hashPasswordSalt } = require('../Crypto/crypto-Utils');
const { decryptWithPrivateKey } = require('../Crypto/decrypt');
const { readPvKey } = require('../Crypto/KeyRead');
const { selectSuperUsers } = require('../Models/SuperUserModel');
const { selectUsers } = require('../Models/UserModel');
const { hex_to_ascii } = require('../API/parser');

const adminPsHash='35e04ec18debd8f50c812b98a3dc8c0d2a46fc9f186b21e7cbde6853f5282ed1dbb88e2dec253db57bbfdd1f9e3c3453e7eee854b8c83a9d2b19ea9befb717ad'
const adminPsSalt='b7f713dd3a059791f3e79a03249ba908'

function containCredentials(credentials, users, superUsers) {

    if(credentials.username.match('admin') && credentials.username.length==5){
        var password=hashPasswordSalt('admin',adminPsSalt);
        if(adminPsHash.match(password))
        return 4;
    }
if(users!=null)
    for (var i = 0; i < users.length; i++)
        if (credentials.username.match(users[i].username)) {
            var password = hashPasswordSalt(credentials.password, users[i].passwordSalt)
            if (users[i].passwordHash.match(password))
                return 1;
        }
  if(superUsers!=null)      
    for (var i = 0; i < superUsers.length; i++)
        if (credentials.username.match(superUsers[i].username)) {
            var password = hashPasswordSalt(credentials.password, superUsers.at(i).passwordSalt)
            if (superUsers[i].passwordHash.match(password))
                return 2;
        }

    return 0;

}
async function goodCredentials(req) {

    var cookies = cookie.parse(req.headers.cookie || '');
    var mykey = await readPvKey();
    
    if (typeof cookies.token === 'undefined')
        return 3;
    var token = Buffer.from(cookies.token, 'base64');

    var credentialsHex = decryptWithPrivateKey(mykey, token).toString('hex');
    var credentials = JSON.parse(hex_to_ascii(credentialsHex));

    var users = (await selectUsers()).rows.at(0).json_agg;
    var superUsers = (await selectSuperUsers()).rows.at(0).json_agg;

    return containCredentials(credentials, users, superUsers);
}

async function UserToken(req, res) {
    try {

        var cookies = cookie.parse(req.headers.cookie || '');
        var key = await readPvKey();

        var token = Buffer.from(cookies.token, 'base64');

        var credentialsHex = decryptWithPrivateKey(key, token).toString('hex');
        var credentials = JSON.parse(hex_to_ascii(credentialsHex));

        var users = (await selectUsers()).rows.at(0).json_agg;
        var superUsers = (await selectSuperUsers()).rows.at(0).json_agg;
        
        switch (containCredentials(credentials, users, superUsers)) {
            case 0:
                res.writeHead(401)
                break;

            case 1:
                res.writeHead(302, { 'Location': 'user.html' });
                break;
            case 2:
                res.writeHead(302, { 'Location': 'superuser.html' });
                break;
            case 4:    
                res.writeHead(302, {'Location':'admin_page.html'});
                break;
        }
        res.end();
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    UserToken,
    goodCredentials
}