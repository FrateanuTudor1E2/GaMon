const pool = require("../API/database");
const { randomId } = require("../Crypto/crypto-Utils");
//Create
async function createPub(pub) {
    return new Promise((resolve, reject) => {
        try {
            var id = randomId();
            
            const newPub = pool.query(
                `Insert into "Pubele"("ID", "tipGunoi","dataCuratare", "capacitate","cantitate" ,"idCartier") Values($1,$2,current_date,$3,$4,$5) Returning *;`,
                [id, pub.tipGunoi, pub.capacitate,pub.cantitate, pub.idCartier]
            );
            resolve(newPub);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deletePub(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedPubela = pool.query(
                `delete from "Pubele" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
//Update
async function updatePubA(id, req) {
    return new Promise((resolve, reject) => {
        try {
            const { newId, dataCuratare } = req.body;
            const updatedPubelaA = pool.query(
                `update "Pubele" set "ID"=$1, "dataCuratare"=$2 where "ID"=${id};`, [newId,dataCuratare]
            )
            resolve(updatedPubelaA);
        } catch (err) {
            reject(err);
        }
    })
}
async function updateStatusPub(id,status){
    return new Promise((resolve, reject) => {
        try {
            const updatedPubelaU = pool.query(
                `update "Pubele" set "raportat"=$1 where "ID"=$2;`, [status,id] 
            )
            resolve(updatedPubelaU);
        } catch (err) {
            reject(err);
        }
    })
}

async function updatePubU(id, req) {
    return new Promise((resolve, reject) => {
        try {
            const { cantitate } = req.body;
            const updatedPubelaU = pool.query(
                `update "Pubele" set "cantitate"=$1 where "ID"=${id};`, [cantitate]
            )
            resolve(updatedPubelaU);
        } catch (err) {
            reject(err);
        }
    })
}

//getByID
async function selectPubByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const Pubela= pool.query(
                `select json_agg(t) from (select * from "Pubele" where "ID"=${id}) t`
            );
            resolve(Pubela);
        } catch (err) {
            reject(err);
        }
    })
}
async function selectPubByStare(){
    return new Promise((resolve, reject) => {
        try {
            const pub = pool.query(
                `select json_agg(t) from (select "Pubele"."ID", "Pubele"."cantitate", "Cartiere"."Nume" 
                as "cart", "Zone"."Nume" as "zn" from "Pubele" Join "Cartiere"
    ON "Pubele"."idCartier"="Cartiere"."ID" and "Pubele"."raportat" JOIN "Zone"
    ON "Cartiere"."idZona"="Zone"."ID") t`
            )
            resolve(pub);
        } catch (err) {
            reject(err);
        }
    })
}

async function selectPub(){
    return new Promise((resolve, reject) => {
        try {
            const pub = pool.query(
                `select json_agg(t) from (Select * from "Pubele") t;`
            )
            resolve(pub);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    selectPubByID,
    updatePubA,
    updatePubU,
    deletePub,
    createPub,
    selectPub,
    updateStatusPub,
    selectPubByStare
}