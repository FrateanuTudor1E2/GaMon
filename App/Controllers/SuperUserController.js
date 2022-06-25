const { selectSuperUsers, delSuperUser } = require("../Models/SuperUserModel");
const { goodCredentials } = require("./authentificate");

async function getSuperUser(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            const events = await selectSuperUsers();
            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(events.rows.at(0)));
        }
    } catch (err) {
        console.log(err.message);
    }

}
async function deleteSuperUser(req, res) {
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
                await delSuperUser(data.id);
                res.writeHead(200);
                res.end();

            })
        }

    } catch (err) {
        console.log(err.message);
    }

}


module.exports = {
    getSuperUser,
    deleteSuperUser
}