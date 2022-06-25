const crypto= require('crypto');
//data protection
function encryptWithPublicKey(publicKey,message){

    const buff =Buffer.from(message,'utf8');
    return crypto.publicEncrypt(publicKey,buff);

}
//digital signature
function encryptWithPrivateKey(privateKey,message){
    const buff =Buffer.from(message,'utf8');
    return crypto.privateEncrypt(privateKey,buff);
}

module.exports.encryptWithPrivateKey= encryptWithPrivateKey;
module.exports.encryptWithPublicKey= encryptWithPublicKey;

/*
       data
server ---> encrypt with private key + hash function + data  -> user

hash.update(data)
hash.digest('hex')
package{alg sha 256 + data + signature}

*/