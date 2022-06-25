const pool = require("../API/database");



//Create
async function createEv(rawData) {
    return new Promise((resolve, reject) => {
        try {
            const data= JSON.parse(rawData);
            const newEvent = pool.query(
                `Insert into "Evenimente"("ID", "descriere", "image", "idSuperUser", "nume") Values($1,$2,$3,$4,$5) Returning *;`,
                [data.id, data.descriere, data.image, data.idSuperUser,data.nume]
            );
            resolve(newEvent);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deleteEv(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedEvent = pool.query(
                `delete from "Evenimente" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
//Update
async function updateEv(event) {
    return new Promise((resolve, reject) => {
        try {
            const data=JSON.parse(event);
            
            
            const updatedEvent = pool.query(
                `update "Evenimente" set  "descriere"=$1, "image"=$2, "nume"=$3 where "ID"=$4;`,
                 [data.descriere, data.image, data.nume, data.id]
            )
            resolve(updatedEvent);
        } catch (err) {
            reject(err);
        }
    })
}


//getAll
async function selectEv() {
    return new Promise((resolve, reject) => {
        try {
            const Events = pool.query(
                `select json_agg(t) from (Select * from "Evenimente") t;`
            )
            resolve(Events);
        } catch (err) {
            reject(err);
        }
    })
}
//getByID
async function selectEvByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const Event = pool.query(
                `select json_agg(t) from (select * from "Evenimente" where "ID"=${id}) t`
            );
            resolve(Event);
        } catch (err) {
            reject(err);
        }
    })
}



module.exports = {
    selectEvByID,
    selectEv,
    updateEv,
    deleteEv,
    createEv
}