const { selectEvents } = require("../Models/eventModel");
const fs = require('fs');
const path = require('path');
const { getEvents, getEventByID, createEvent, updateEvent, deleteEvent } = require("../Controllers/eventController");
const { Register,RegisterSuperUser } = require("../Controllers/registerController");
const { getToken } = require("../Controllers/token");
const { UserToken, goodCredentials } = require("../Controllers/authentificate");

const { getZone, addZona, deleteZona  } = require("../Controllers/ZonaController");
const { getCartiere, addCartier,deleteCartier } = require("../Controllers/CartierController");
const { getPubele, changeStatusPubela,getPubeleRaportat, createPubela, deletePubela } = require("../Controllers/PubelaController");
const { createRequest, getRequests, RequestsHtmlFile, RequestsSVGFile, RequestsPDFFile, RequestsCSVFile } = require("../Controllers/CereriController");

const { createReport, getReports, deleteReport } = require("../Controllers/ReportController");
const {getSuperUser, deleteSuperUser} = require("../Controllers/SuperUserController");

const allRoutes = {
    'auth': function (req, res) {
        UserToken(req, res);
    },
    'token': function (req, res) {
        getToken(req, res);
    },
    'js': function (req, res) {
        var jsPath = path.join(__dirname, '..', '..', req.url);
        var fileStream = fs.createReadStream(jsPath);
        res.statusCode = 200;
        // res.setHeader('Cache-control', 'public, max-age=300000');
        res.setHeader('Content-Type', 'text/javascript');
        fileStream.pipe(res);
        
    },
    'html': async function (req, res) {
        var credential = await goodCredentials(req);
        if(req.url.match('admin_page.html') && credential !=4 ){
            res.writeHead(401);
            res.end();
        }else if (req.url.match('user.html')&& !req.url.match('superuser.html') && credential != 1) {
            res.writeHead(401);
            res.end();
        } else if (req.url.match('superuser.html') && credential != 2) {
            
            res.writeHead(401);
            res.end();
        } else {
            var file = req.url.split("/");
            var htmlPath = path.join(__dirname, '..', 'Views', file[file.length - 1]);
            var fileStream = fs.createReadStream(htmlPath, "utf8");
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fileStream.pipe(res);
        }
    },
    'jpg': function (req, res) {
        var jpgPath = path.join(__dirname, '..', '..', req.url);
        var fileStream = fs.createReadStream(jpgPath);
        res.statusCode = 200;
        res.setHeader('Cache-control', 'public, max-age=300000');
        res.setHeader('Content-Type', 'text/jpg');
        fileStream.pipe(res);
    },
    'png': function (req, res) {
        var pngPath = path.join(__dirname, '..', '..', req.url);
        var fileStream = fs.createReadStream(pngPath);
        res.statusCode = 200;
        res.setHeader('Cache-control', 'public, max-age=300000');
        res.setHeader('Content-Type', 'text/png');
        fileStream.pipe(res);
    },
    'ico':  function (req, res) {
        var icoPath = path.join(__dirname, '..', '..', req.url);
        var fileStream = fs.createReadStream(icoPath);
        res.statusCode = 200;
        res.setHeader('Cache-control', 'public, max-age=300000');
        res.setHeader('Content-Type', 'image/x-icon');
        fileStream.pipe(res);
    },
    'css': function (req, res) {
        var cssPath = path.join(__dirname, '..', '..', req.url);
        var fileStream = fs.createReadStream(cssPath, "utf8");
        res.statusCode = 200;
        res.setHeader('Cache-control', 'public, max-age=300000');
        res.setHeader('Content-Type', 'text/css');
        fileStream.pipe(res);
    },
    '/api/getEvents': function (req, res) {
        getEvents(req, res);
    },
    '/api/getEventByID': function (req, res) {
        const arr= req.url.split('/');
        const id =arr[arr.length-1];
        getEventByID(req, res, id);

    },
    '/api/createEvent': function (req, res) {
        createEvent(req, res);
    },
    '/api/updateEvent': function (req, res) {
    
        updateEvent(req, res);
    },
    '/api/deleteEvent': function (req, res) {
        const arr= req.url.split('/');
        const id =arr[arr.length-1];
        deleteEvent(req, res, id);
    },
    '/api/Register': function (req, res) {
        Register(req, res);
    },
    'api/Zone': function (req, res) {
        getZone(req, res);
    },
    'api/getZone': function (req, res) {
        getZone(req, res);
    },
    'api/Cartiere': function (req, res) {
        getCartiere(req, res);
    },
    'api/Pubele': function (req, res) {
        getPubele(req, res);
    },
    '/api/addPubela':function (req,res){
        createPubela(req,res);
    },
    '/api/delPubela':function (req,res){
        
        deletePubela(req,res);
    },
    'api/Cerere': function (req, res) {
        createRequest(req, res);
    },
    'api/getCerere': function (req, res) {
        getRequests(req, res);
    },
    'api/PubStatus': function (req, res) {
        changeStatusPubela(req, res);
    },
    'api/getPubRaportat': function(req,res){
        getPubeleRaportat(req,res);
    },
    'api/makeReport': function(req,res){
        createReport(req,res);
    },
    'api/Reports': function(req,res){
        getReports(req,res);
    },
    'api/deleteReport': function(req,res){
        const arr= req.url.split('/');
        const id =arr[arr.length-1];
        deleteReport(req, res, id);
    },    
    'api/generateHtml': function(req,res){
        RequestsHtmlFile(req,res);
    },
    'api/generateCSV': function(req,res){
        RequestsCSVFile(req,res);
    },
    'api/generatePDF': function(req,res){
        RequestsPDFFile(req,res);
    },
    'api/generateSVG':function(req,res){
        RequestsSVGFile(req,res);
    },
    '/api/RegisterSuperUser' :function(req,res){
        RegisterSuperUser(req,res);
    },
    '/api/selectSuperUser' :function(req,res){
        getSuperUser(req,res);
    },
    '/api/delSuperUser' :function(req,res){
        deleteSuperUser(req,res);
    },
    '/api/addZona' :function(req,res){
        addZona(req,res);
    },
    '/api/delZona' :function(req,res){
        deleteZona(req,res);
    },
    '/api/addCartier':function(req,res){
        addCartier(req,res);
    },
    '/api/getCartiere':function(req,res){
        getCartier(req,res);
    },
    '/api/delCartier':function(req,res){
        deleteCartier(req,res);
    },
    
    default: (req, res) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
    }

}

module.exports.allRoutes = allRoutes;