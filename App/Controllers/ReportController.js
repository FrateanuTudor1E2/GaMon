const { selectRep, createRep, deleteRep, selectRepByID } = require("../Models/ReportModel");
const multipart = require('parse-multipart-data');
const { hex_to_ascii } = require("../API/parser");
const { getUserFromToken } = require("./token");
const { goodCredentials } = require("./authentificate");

async function getReports(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            const reports = await selectRep();
            res.writeHead(200, { 'Content-Type': 'application/json' })

            res.end(JSON.stringify(reports.rows.at(0)));
        }
    } catch (err) {
        console.log(err.message);
    }

}
async function getReportByID(req, res, id) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            const report = await selectRepByID(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(report.rows.at(0)));
        }
    } catch (err) {
        console.log(err.message);
    }
}
async function createReport(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 1) {
            res.writeHead(403)
            res.end();
        } else {

            req.setEncoding(null);
            var buf = '';
            req.on('data', (chunk) => {
                buf += chunk;
            })
            req.on('end', async function () {

                const rawData = new Buffer.from(buf);
                const boundary = multipart.getBoundary(req.headers['content-type']);
                const parts = multipart.parse(Buffer.from(rawData), boundary);

                const user = await getUserFromToken(req);
                const desc = hex_to_ascii(parts[0].data.toString('hex'));

                const imageHex = parts[1].data.toString('hex');
                const report = await createRep(JSON.stringify({ 'descriere': desc, 'image': imageHex, 'imageType': parts[1].type, 'userID': user.ID }));

                res.writeHead(201);
                res.end();

            })
        }

    } catch (err) {
        console.log(err.message);
    }
}
async function deleteReport(req, res, id) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2) {
            res.writeHead(403)
            res.end();
        } else {
            const report = await deleteRep(id);
            res.writeHead(204);
            res.end();
        }
    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    createReport,
    getReportByID,
    getReports,
    deleteReport,
}