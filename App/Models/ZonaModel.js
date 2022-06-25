const pool = require("../API/database");
const { randomId } = require("../Crypto/crypto-Utils");
async function selectZone(){
    return new Promise((resolve, reject) => {
        try {
            const Zone = pool.query(
                `select json_agg(t) from (Select * from "Zone") t;`
            )
            resolve(Zone);
        } catch (err) {
            reject(err);
        }
    })
}
async function creatZona(zona) {
    return new Promise((resolve, reject) => {
        try {
         var id = randomId();
            const newZona = pool.query(
                `Insert into "Zone"("ID", "Nume") Values($1,$2) Returning *;`,
                [id, zona.nume]
            );
            resolve(newZona);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deletZona(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedZona = pool.query(
                `delete from "Zone" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}

async function selectZonaByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const Cartier= pool.query(
                `select json_agg(t) from (select * from "Zone" where "ID"=${id}) t`
            );
            resolve(Cartier);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports={
    selectZone,
    creatZona,
    deletZona,
    selectZonaByID
}