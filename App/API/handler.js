const { allRoutes } = require("./routes");


function handler(req, res) {

    let key = 'default';
    if( req.url.match('api/generateSVG') && req.method === 'POST'){
        key='api/generateSVG'
    }else if( req.url.match('api/generatePDF') && req.method === 'POST'){
        key='api/generatePDF';
    }else if(req.url.match('api/generateCSV') && req.method === 'POST'){
        key='api/generateCSV';
    }else if(req.url.match('api/generateHtml') && req.method === 'POST'){
        key='api/generateHtml';
    }else if(req.url.match('api/Reports') && req.method === 'GET'){
        key='api/Reports';
    }else if(req.url.match(/\/api\/Reports\/([0-9]+)/) && req.method === 'DELETE'){
        key='api/deleteReport';
    }else if (req.url.match("/api/makeReport") && req.method === 'POST') {
        key = 'api/makeReport';
    } else if(req.url.match('/api/getPubRaportat') && req.method ==='GET'){
        key='api/getPubRaportat';
    }else if (req.url.match("/api/PubStatus") && req.method === 'PUT') {
        key = 'api/PubStatus';
    } else if (req.url.match("/api/Cerere") && req.method === 'GET') {
        key = 'api/getCerere';
    } else if (req.url.match("/api/Cerere") && req.method === 'POST') {
        key = 'api/Cerere';
    } else if (req.url.match("/api/Pubele") && req.method === 'GET') {
        key = 'api/Pubele';
    } else if (req.url.match("/api/addPubela") && req.method === 'POST') {
        key = '/api/addPubela';
    } else if (req.url.match("/api/delPubela") && req.method === 'DELETE') {
        key = '/api/delPubela';
    } else if (req.url.match("/api/Zone") && req.method === 'GET') {
        key = 'api/Zone';
    } else if (req.url.match("/api/getZone") && req.method === 'GET') {
        key = 'api/getZone';
    } else if(req.url.match("/api/addZona") && req.method === 'POST') {
        key = '/api/addZona';
    } else if(req.url.match("/api/delZona") && req.method === 'DELETE') {
        key = '/api/delZona';
    } else if (req.url.match("/api/addCartier") && req.method === 'POST') {
        key = '/api/addCartier';
    } else if (req.url.match("/api/delCartier") && req.method === 'DELETE') {
        key = '/api/delCartier';
    }else if (req.url.match("/api/Cartiere") && req.method === 'GET') {
        key = 'api/Cartiere';
    } else if (req.url.match("/api/auth") && req.method === 'POST') {
        key = 'auth';
    } else if (req.url.match("/api/token") && req.method === 'POST') {
        key = 'token';
    } else if (req.url.match("/api/Register") && req.method === 'POST') {
        key = '/api/Register';
    }else if (req.url.match("/api/SuperUserRegister") && req.method === 'POST') {
        key = '/api/RegisterSuperUser';   
    } if (req.url.match('/api/updateEvents/') && req.method === 'POST') {
        key = '/api/updateEvent';
    } if (req.url.match(/\/api\/Events\/([0-9]+)/) && req.method === 'DELETE') {
        key = '/api/deleteEvent';
    } else if (req.url.match("/api/Events") && req.method === 'POST') {
        key = '/api/createEvent';
    } else if (req.url.match(/\/api\/Events\/([0-9]+)/) && req.method === 'GET') {
        key = '/api/getEventByID';
    } else if (req.url.match("/api/Events") && req.method === 'GET'){
        key = '/api/getEvents';
    } else if(req.url.match('/api/SelectSuperUser')&& req.method === 'GET'){
        key = '/api/selectSuperUser';
        console.log(key);
    } else if(req.url.match('/api/delSuperUser')&& req.method === 'DELETE'){
        key = '/api/delSuperUser';
    } else if (req.url.match("\.css$")) {
        key = 'css';
    } else if (req.url.match("\.png$")) {
        key = 'png';
    } else if (req.url.match("\.jpg$")) {
        key = 'jpg';
    } else if (req.url.match("\.html$")) {
        key = 'html';
    } else if (req.url.match("\.js$")) {
        key = 'js';
    }else if( req.url.match("\.ico$")){
        key='ico';
    }
  
    
    const chosen = allRoutes[key];
    return chosen(req, res);
}

module.exports.handler = handler;