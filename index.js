const http= require('http');
const { debug } = require('console');
const { handler } = require('./App/API/handler');
const genKey= require("./App/Crypto/createKeypair");


//genKey.genKeyPair();
const PORT = process.env.PORT || 5000;


const server= http.createServer(
handler).listen(PORT,() => console.log(`Server running on port: ${PORT}`));

