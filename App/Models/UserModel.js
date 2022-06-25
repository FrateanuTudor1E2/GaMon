const pool = require("../API/database");
const { randomId, hashPassword } = require("../Crypto/crypto-Utils");



//Create
async function createUser(user) {
    return new Promise((resolve, reject) => {
        try {

            const hash=hashPassword(user.password);
            const id=randomId();

            const newUser = pool.query(
                `Insert into "Useri"("ID", "username", "email", "passwordHash", "passwordSalt") Values($1,$2,$3,$4,$5) Returning *;`,
                [id, user.username, user.email, hash.hashPassword,hash.salt]
            );
            resolve(newUser);
        } catch (err) {
            reject(err);
        }
    })
}
//Delete
async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        try {
            const deleteUser = pool.query(
                `delete from "Useri" where "id"=${id};`,
            );
            resolve();
        } catch (err) {
            reject(err);
        }
    })

}
//Update
async function updateUser(id, req) {
    return new Promise((resolve, reject) => {
        try {
            const { newId, username, email } = req.body;
            const updateUser = pool.query(
                `update "Useri" set "ID"=$1, "username"=$2, "email"=$3 where "id"=${id};`, [newId, descriere, image]
            )
            resolve(updateUser);
        } catch (err) {
            reject(err);
        }
    })
}


//getAll
async function selectUsers() {
    return new Promise((resolve, reject) => {
        try {
            const Users = pool.query(
                `select json_agg(t) from (Select * from "Useri") t;`
            )
            resolve(Users);
        } catch (err) {
            reject(err);
        }
    })
}

//getByID
async function selectUser(id) {
    return new Promise((resolve, reject) => {
        try {
            const user = pool.query(
                `select json_agg(t) from (select * from "Useri" where "ID"=${id}) t`
            );
            resolve(user);
        } catch (err) {
            reject(err);
        }
    })
}



module.exports = {
    selectUser,
    selectUsers,
    updateUser,
    deleteUser,
    createUser
}