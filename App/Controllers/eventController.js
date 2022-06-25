const { selectEv, createEv, deleteEv, updateEv, selectEvByID } = require("../Models/eventModel");
const multipart = require('parse-multipart-data');
const { getUserFromToken } = require("./token");
const { randomId } = require("../Crypto/crypto-Utils");
const { hex_to_ascii } = require("../API/parser");
const { goodCredentials } = require("./authentificate");


async function getEvents(req, res) {
    try {
        const events = await selectEv();
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(events.rows.at(0)));

    } catch (err) {
        console.log(err.message);
    }

}
async function getEventByID(req, res, id) {
    try {
        const event = await selectEvByID(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(event.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
async function createEvent(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            req.setEncoding(null);
            buf = ''
            req.on('data', (data) => {
                buf += data;
            }).on('end', async function () {
                const rawData = new Buffer.from(buf);

                const boundary = multipart.getBoundary(req.headers['content-type']);
                const parts = multipart.parse(Buffer.from(rawData), boundary);

                const user = await getUserFromToken(req);

                const event = await createEv(JSON.stringify({
                    'id': randomId(),
                    'descriere': hex_to_ascii(parts[1].data.toString('hex')),
                    'image': parts[2].data.toString('hex'),
                    'idSuperUser': user.ID,
                    'nume': hex_to_ascii(parts[0].data.toString('hex'))
                }));

                res.writeHead(201);
                res.end();
            })
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function updateEvent(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            req.setEncoding(null);
            buf = ''
            req.on('data', (data) => {
                buf += data;
            }).on('end', async function () {
                const rawData = new Buffer.from(buf);
                const boundary = multipart.getBoundary(req.headers['content-type']);
                const parts = multipart.parse(Buffer.from(rawData), boundary);
                
                const event = await updateEv(JSON.stringify({
                    'id': hex_to_ascii(parts[0].data.toString('hex')),
                    'descriere': hex_to_ascii(parts[2].data.toString('hex')),
                    'image': parts[3].data.toString('hex'),
                    'nume': hex_to_ascii(parts[1].data.toString('hex'))
                }));

                res.writeHead(204);
                res.end();
            })




        }
    } catch (err) {
        console.log(err.message);
    }
}
async function deleteEvent(req, res, id) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            const event = await deleteEv(id);
            res.writeHead(204);
            res.end();
        }
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    createEvent,
    updateEvent,
    getEventByID,
    getEvents,
    deleteEvent,
}