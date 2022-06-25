const pool = require("../API/database");
const { hashPassword, randomId } = require("../Crypto/crypto-Utils");

async function selectSuperUsers() {
    return new Promise((resolve, reject) => {
        try {
            const Users = pool.query(
                `select json_agg(t) from (Select * from "SuperUseri") t;`
            )
            resolve(Users);
        } catch (err) {
            reject(err);
        }
    })
}
async function createSuperUser(user) {
    return new Promise((resolve, reject) => {
        try {

            const hash=hashPassword(user.password);
            const id=randomId();

            const newUser = pool.query(
                `Insert into "SuperUseri"("ID", "username", "email", "passwordHash", "passwordSalt") Values($1,$2,$3,$4,$5) Returning *;`,
                [id, user.username, user.email, hash.hashPassword,hash.salt]
            );

            resolve(newUser);
        } catch (err) {
            reject(err);
        }
    })
}
async function updateSuperUser(id, req) {
    return new Promise((resolve, reject) => {
        try {
            const { newId, username, email } = req.body;
            const updateUser = pool.query(
                `update "SuperUseri" set "ID"=$1, "username"=$2, "email"=$3 where "id"=${id};`, [newId, descriere, image]
            )
            resolve(updateUser);
        } catch (err) {
            reject(err);
        }
    })
}
async function delSuperUser(id) {
    return new Promise((resolve, reject) => {
        try {
            const deletedPubela = pool.query(
                `delete from "SuperUseri" where "ID"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
module.exports={
    selectSuperUsers,
    createSuperUser,
    delSuperUser
}