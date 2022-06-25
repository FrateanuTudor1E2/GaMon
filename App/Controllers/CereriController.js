const { randomId } = require("../Crypto/crypto-Utils");
const { selectReq, createReq, selectReqByUserID, selectDataForReport } = require("../Models/CereriModel");
const { selectPubByID } = require("../Models/PubelaModel");
const { createRow, createHtml, createTable } = require("../Utils/htmlGenerate");
const { goodCredentials } = require("./authentificate");
const { getUserFromToken } = require("./token");
const converter= require('json-2-csv');
const puppeteer= require('puppeteer');
const { makeSvg } = require("../Utils/SvgGenerate");


async function RequestsSVGFile(req,res){
    try {
        
        buf = '';
        req.on('data', (data) => {
            buf += data.toString();
        }).on('end', async function(){
            const rawData = JSON.parse(buf);
            var query = (await selectDataForReport(rawData.time)).rows.at(0).json_agg;
            var html=await makeSvg(query,rawData.type,res);
            
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html);
            res.end();
        })

    } catch (err) {
        console.log(err);
    }

}

async function RequestsPDFFile(req,res){
    try {
        
        buf = '';
        req.on('data', (data) => {
            buf += data.toString();
        }).on('end', async function(){
            const rawData = JSON.parse(buf);
            var query = (await selectDataForReport(rawData.time)).rows.at(0).json_agg;
            var rows=''
            for (var i = 0; i < query.length; i++) {
                const row= createRow(query[i]);
                rows+=row.toString();
            }
            const table=createTable(rows);
            const html= createHtml(table);
            
            const browser = await puppeteer.launch({headless:true});
            const page= await browser.newPage();
            await page.setContent(html, {waitUntil: 'domcontentloaded'})
            const pdf= await page.pdf({format:'A4'});
            await page.close();
            await browser.close();
            res.writeHead(200, { 'Content-Type': 'application/pdf' })
            res.end(pdf);

        })

    } catch (err) {
        console.log(err);
    }
}


async function RequestsHtmlFile(req, res) {
    try {
        
        buf = '';
        req.on('data', (data) => {
            buf += data.toString();
        }).on('end', async function(){
            const rawData = JSON.parse(buf);
            var query = (await selectDataForReport(rawData.time)).rows.at(0).json_agg;
            var rows=''
            for (var i = 0; i < query.length; i++) {
                const row= createRow(query[i]);
                rows+=row.toString();
            }
            const table=createTable(rows);
            const html= createHtml(table);

            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(html);

        })

    } catch (err) {
        console.log(err);
    }
}
async function RequestsCSVFile(req,res){
    try {
        
        buf = '';
        req.on('data', (data) => {
            buf += data.toString();
        }).on('end', async function(){
            const rawData = JSON.parse(buf);
            var query = (await selectDataForReport(rawData.time)).rows.at(0).json_agg;
            converter.json2csv(query,(err,csv)=>{
                if(err){
                    throw err;
                }
                res.writeHead(200, { 'Content-Type': 'text/csv' })
                res.end(csv);
            })
        })

    } catch (err) {
        console.log(err);
    }
}

async function getRequests(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 2 && credential != 1) {
            res.writeHead(403)
            res.end();
        } else {
            const user = await getUserFromToken(req);
            const requests = await selectReqByUserID(user.ID);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(requests.rows.at(0)));
        }
    } catch (err) {
        console.log(err.message);
    }

}

async function createRequest(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 1) {
            res.writeHead(403)
            res.end();
        } else {

            var buf = ''
            req.on('data', (data) => {
                buf += data.toString();
            })
            req.on('end', async function () {
                const data = JSON.parse(buf.toString());

                const pubela = (await selectPubByID(data.idPubela)).rows.at(0).json_agg;
                const user = await getUserFromToken(req);

                data["id"] = randomId();
                data["tipGunoi"] = pubela[0].tipGunoi;
                data["stare"] = false;
                data["idUser"] = user.ID;

                const event = await createReq(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(event.rows.at(0)));
            })

        }
    } catch (err) {
        console.log(err.message);
    }
}


module.exports = {
    createRequest,
    getRequests,
    RequestsHtmlFile,
    RequestsCSVFile,
    RequestsPDFFile,
    RequestsSVGFile
}