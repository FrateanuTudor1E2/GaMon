//create
//delete
//updateStatus
//selectAll

const pool = require("../API/database");



//Create
async function createReq(data) {
    return new Promise((resolve, reject) => {
        try {
           
            const newRequest = pool.query(
                `Insert into "Cereri"("ID", "dataCerere" , "cantitate", "tipGunoi","idUser","idPubela","stare") 
                Values($1,to_timestamp(${Date.now()}/1000.0),$2,$3,$4,$5,$6) Returning *;`,
                [data.id,parseInt(data.cantitate), data.tipGunoi,data.idUser, parseInt(data.idPubela),data.stare]
            );
            resolve(newRequest);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deleteReq(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedEvent = pool.query(
                `delete from "Cereri" where "id"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
//Update
async function updateReq(id, req) {
    return new Promise((resolve, reject) => {
        try {
            const { id, dataCerere, cantitate, tipGunoi,idUser,idPubela,stare } = req.body;
            const updateReq = pool.query(
                `update "Evenimente" set "ID"=$1, "descriere"=$2, "image"=$3 where "id"=${id};`, 
                [id, dataCerere, cantitate, tipGunoi,idUser,idPubela,stare]
            )
            resolve(updateReq);
        } catch (err) {
            reject(err);
        }
    })
}


//getAll
async function selectReq() {
    return new Promise((resolve, reject) => {
        try {
            const requests = pool.query(
                `select json_agg(t) from (Select * from "Cereri") t;`
            )
            resolve(requests);
        } catch (err) {
            reject(err);
        }
    })
}
//getByID
async function selectReqByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const requests = pool.query(
                `select json_agg(t) from (select * from "Cereri" where "ID"=${id}) t`
            );
            resolve(requests);
            
        } catch (err) {
            reject(err);
        }
    })
}

async function selectReqByUserID(id) {
    return new Promise((resolve, reject) => {
        try {
            
            const requests = pool.query(
                `select json_agg(t) from (select * from "Cereri" where "idUser"=${id}) t`
            );
            
            resolve(requests);
        } catch (err) {
            reject(err);
        }
    })
}

async function selectDataForReport(intervalDays){
    return new Promise((resolve, reject) => {
        try {

            var day= parseInt(intervalDays);
            
            const requests = pool.query(
               `select json_agg(t) from 
               (select current_date - $1 as "from", current_date "to",
               Sum("Cereri"."cantitate"),"Cereri"."tipGunoi",
               "Cartiere"."ID" as "idCartier","Cartiere"."Nume" as "numeCartier",
               "Zone"."ID" as "idZona", "Zone"."Nume" as "numeZona"  from "Cereri" Join "Pubele" 
               on "Cereri"."idPubela"="Pubele"."ID" and
               current_date - "Cereri"."dataCerere" <= $1 
               JOIN "Cartiere" on "Pubele"."idCartier"="Cartiere"."ID"
               Join "Zone" on "Cartiere"."idZona"="Zone"."ID"
               group by( "Zone"."ID", "Cartiere"."ID","Cereri"."tipGunoi")
               order by ("Zone"."Nume") asc, ("Cartiere"."Nume") asc, (Sum("Cereri"."cantitate")) asc) t`,
               [day]
            );

            
            resolve(requests);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    selectReq,
    selectReqByID,
    createReq,
    deleteReq,
    updateReq,
    selectReqByUserID,
    selectDataForReport
}