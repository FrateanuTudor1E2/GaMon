const { selectZonaByID, deletZona, creatZona, selectZone } = require("../Models/ZonaModel");
const { goodCredentials } = require("./authentificate");


async function addZona(req, res) {
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
                creatZona(user);

                res.writeHead(200);
                res.end();
            })
        }
    } catch (err) {
        console.log(err);
    }

}
async function deleteZona(req, res) {
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
                console.log(data.id);
                await deletZona(data.id);
                res.writeHead(200);
                res.end();

            })
        }


    } catch (err) {
        console.log(err.message);
    }
}
async function getZonaByID(req, res, id) {
    try {
        const zone = await selectZonaByID(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(zone.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
async function getZone(req, res) {
    try {
        const zone = await selectZone();
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(zone.rows.at(0)));

    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    deleteZona,
    getZonaByID,
    getZone,
    addZona
}