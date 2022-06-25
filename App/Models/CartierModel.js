const pool = require("../API/database");
const { randomId } = require("../Crypto/crypto-Utils");
//Create
async function createCart(cart) {
    return new Promise((resolve, reject) => {
        try {
            var id = randomId();
            const newCartier = pool.query(
                `Insert into "Cartiere"("ID", "Nume", "adresa", "idZona") Values($1,$2,$3,$4) Returning *;`,
                [id, cart.nume, cart.adresa, cart.idZona]
            );
            resolve(newCartier);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deleteCart(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedCartier = pool.query(
                `delete from "Cartiere" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
async function selectCart(){
    return new Promise((resolve, reject) => {
        try {
            const Cartiere = pool.query(
                `select json_agg(t) from (Select * from "Cartiere") t;`
            )
            resolve(Cartiere);
        } catch (err) {
            reject(err);
        }
    })
}

//getByID
async function selectCartByID(id) {
    return new Promise((resolve, reject) => {
        try {
            const Cartier= pool.query(
                `select json_agg(t) from (select * from "Cartiere" where "ID"=${id}) t`
            );
            resolve(Cartier);
            
        } catch (err) {
            reject(err);
        }
    })
}
module.exports = {
    selectCartByID,
    deleteCart,
    createCart,
    selectCart
}