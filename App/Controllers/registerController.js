
const { parserUser } = require("../API/parser");
const { encryptWithPublicKey } = require("../Crypto/encrypt");
const { readPbKey } = require("../Crypto/KeyRead");
const { createSuperUser } = require("../Models/SuperUserModel");
const { createUser } = require("../Models/UserModel");
const cookie = require('cookie');


async function Register(req,res){
try{
var buf=''
req.on('data',(data)=>{
    buf+=data.toString();
})
req.on('end',async function (){
const user=parserUser(buf);

let key = await readPbKey();
let token = encryptWithPublicKey(key, JSON.stringify(user));
createUser(user);

res.setHeader('Set-Cookie', cookie.serialize('token', token.toString('base64'), { maxAge: 60 * 60 * 24 * 2, path: '/', sameSite: "lax", secure: 'true' ,httpOnly:"true"}));
res.writeHead(302,{'Location':'user.html'});
res.end();
})

}catch(err){
    console.log(err);
}

}
async function RegisterSuperUser(req,res){
    try{
    var buf=''
    req.on('data',(data)=>{
        buf+=data.toString();
    })
    req.on('end',()=>{
    const user=JSON.parse(buf);
    createSuperUser(user);
    
    res.writeHead(200);
    res.end();
    })
    
    }catch(err){
        console.log(err);
    }
    
    }
module.exports={
    Register,
    RegisterSuperUser
}