const pool = require("../API/database");
const { randomId } = require("../Crypto/crypto-Utils");
//Create


async function createRep(input) {
    return new Promise((resolve, reject) => {
        try {
            const data=JSON.parse(input);
            const id=randomId();
            
            const newReport = pool.query(
                `Insert into "Report"("ID", "descriere", "image", "imageType", "idUser") Values($1,$2,$3,$4,$5) Returning *;`,
                [id, data.descriere, data.image,data.imageType, data.userID]
            );
            resolve(newReport);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deleteRep(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedEvent = pool.query(
                `delete from "Report" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
//getAll
async function selectRep() {
    return new Promise((resolve, reject) => {
        try {
            const Reports = pool.query(
                `select json_agg(t) from (Select * from "Report") t;`
            )
            resolve(Reports);
        } catch (err) {
            reject(err);
        }
    })
}
//getByID
async function selectRepByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const Report = pool.query(
                `select json_agg(t) from (select * from "Report" where "ID"=${id}) t`
            );
            resolve(Report);
        } catch (err) {
            reject(err);
        }
    })
}



module.exports = {
    selectRepByID,
    selectRep,
    deleteRep,
    createRep
}