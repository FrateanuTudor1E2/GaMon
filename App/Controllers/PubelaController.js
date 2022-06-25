const { selectPubByID, updatePubA, updatePubU, deletePub, createPub, selectPub, updateStatusPub, selectPubByStare } = require("../Models/PubelaModel");
const { goodCredentials } = require("./authentificate");
async function changeStatusPubela(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential == 0 || credential == 3) {
            res.writeHead(401)
            res.end();
        } else {
            buf = '';
            req.on('data', (data) => {
                buf += data.toString();
            })
            req.on('end', async function () {

                const data = JSON.parse(buf);
                updateStatusPub(data.id, data.status);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end();
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}

async function createPubela(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            var buf = ''
            req.on('data', (data) => {
                buf += data.toString();
            })
            req.on('end', () => {
                const user = JSON.parse(buf);

                createPub(user);

                res.writeHead(200);
                res.end();
            })

        }
    } catch (err) {
        console.log(err.message);
    }
}
async function deletePubela(req, res) {
    try {
        var credential = await goodCredentials(req);
       
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            var buffer = '';
            req.on('data', (data) => {
                buffer += data.toString();
            }).on('end', async function () {
                var data = JSON.parse(buffer)
                await deletePub(data.id);


                res.writeHead(204);
                res.end();
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function updatePubelaA(req, res, id) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            const event = await updatePubA(id, req);
            res.writeHead(204);
            res.end();
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function updatePubelaU(req, res, id) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            const event = await updatePubU(id, req);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function getPubelaByID(req, res, id) {
    try {
        const event = await selectPubByID(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(event.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
async function getPubele(req, res) {
    try {
        const event = await selectPub();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(event.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
async function getPubeleRaportat(req, res) {
    try {
        const event = await selectPubByStare();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(event.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    createPubela,
    updatePubelaA,
    updatePubelaU,
    getPubelaByID,
    deletePubela,
    getPubele,
    changeStatusPubela,
    getPubeleRaportat
}