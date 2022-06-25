const { hashPasswordSalt } = require('../Crypto/crypto-Utils');
const { encryptWithPublicKey } = require("../Crypto/encrypt");
const { readPbKey, readPvKey } = require("../Crypto/KeyRead");
const { selectSuperUsers } = require('../Models/SuperUserModel');
const { selectUsers } = require('../Models/UserModel');
const { decryptWithPrivateKey } = require("../Crypto/decrypt");
const { hex_to_ascii } = require('../API/parser');
const cookie = require('cookie');
async function getToken(req, res) {

    var buf = ''
    req.on('data', (data) => {
        buf += data.toString();
    })
    let key = await readPbKey();

    let token = encryptWithPublicKey(key, buf.toString());


    res.setHeader('Set-Cookie', cookie.serialize('token', token.toString('base64'), { maxAge: 60 * 60 * 24 * 2, path: '/', sameSite: "lax", secure: 'true' ,httpOnly:"true"}));
    res.writeHead(200);
    res.end();
}

async function getUserFromToken(req) {

    var cookies = cookie.parse(req.headers.cookie || '');
    var key = await readPvKey();
    var token = Buffer.from(cookies.token, 'base64');

    var credentialsHex = decryptWithPrivateKey(key, token).toString('hex');
    var credentials = JSON.parse(hex_to_ascii(credentialsHex));

    var users = (await selectUsers()).rows.at(0).json_agg;
    var superUsers= (await selectSuperUsers()).rows.at(0).json_agg;

    for (var i = 0; i < users.length; i++)
        if (credentials.username.match(users[i].username)) {
            var password = hashPasswordSalt(credentials.password, users[i].passwordSalt)
            if (users[i].passwordHash.match(password))
                return users[i];
        }
    for (var i = 0; i < superUsers.length; i++)
        if (credentials.username.match(superUsers[i].username)) {
            var password = hashPasswordSalt(credentials.password, superUsers[i].passwordSalt)
            if (superUsers[i].passwordHash.match(password))
                return superUsers[i];
        }

}

module.exports = {
    getToken,
    getUserFromToken

}