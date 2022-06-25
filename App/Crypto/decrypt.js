const crypto= require('crypto');

function decryptWithPrivateKey(privateKey, encryptedMsg){
    return crypto.privateDecrypt({
        key:privateKey,
        padding:crypto.constants.RSA_PKCS1_OAEP_PADDING}
        ,encryptedMsg);
}

function decryptWithPublicKey(publicKey,encryptedMsg){
    return crypto.publicDecrypt(publicKey,encryptedMsg);
}

module.exports.decryptWithPublicKey= decryptWithPublicKey;
module.exports.decryptWithPrivateKey= decryptWithPrivateKey;