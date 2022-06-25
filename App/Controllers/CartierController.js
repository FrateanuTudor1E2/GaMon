const { selectCartByID, deleteCart, createCart, selectCart } = require("../Models/CartierModel");
const { goodCredentials } = require("./authentificate");

async function addCartier(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            var buf = ''
            req.on('data', (data) => {
                buf += data.toString();
            })
            req.on('end', () => {
                const user = JSON.parse(buf);

                createCart(user);

                res.writeHead(200);
                res.end();
            })
        }

    } catch (err) {
        console.log(err);
    }

}
async function deleteCartier(req, res) {
    try {
        var credential = await goodCredentials(req);
        if (credential != 4) {
            res.writeHead(403)
            res.end();
        } else {
            var buffer = '';
            req.on('data', (data) => {
                buffer += data.toString();
            }).on('end', async function () {
                var data = JSON.parse(buffer)
                await deleteCart(data.id);
                res.writeHead(200);
                res.end();

            })
        }


    } catch (err) {
        console.log(err.message);
    }
}
async function getCartierByID(req, res, id) {
    try {
        const Cartiere = await selectCartByID(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(Cartiere.rows.at(0)));
    } catch (err) {
        console.log(err.message);
    }
}
async function getCartiere(req, res) {
    try {
        const Cartiere = await selectCart();
        res.writeHead(200, { 'Content-Type': 'application/json' })

        res.end(JSON.stringify(Cartiere.rows.at(0)));

    } catch (err) {
        console.log(err.message);
    }
}
module.exports = {
    deleteCartier,
    getCartierByID,
    getCartiere,
    addCartier
}