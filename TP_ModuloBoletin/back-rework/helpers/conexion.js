const fs = require("fs");
const { Client } = require('pg')

const getConexion = async () => {
    try {
        const client = new Client(
            {
                host: 'ec2-54-152-28-9.compute-1.amazonaws.com',
                user: 'rqczktdspsnatd',
                password: '0311f177e62edbfdbf9b343e27b8bb275c8f56a5c63f00db10d41c5f6efcf9b9',
                database: 'dfcs8o23udm9om',
                port: 5432,
            });
            await client.connect();
            console.log("Conectado a base de datos Boletin");

    } catch (error) {
        console.log(error.message);
    }


};

const saveBoletinMetasCumplidas = async () => {

    const archivo = fs.readFileSync(__dirname + "/pdf-metas-cumplidas/pdfs/boletin-metas-cumplidas.pdf");
    const pdfBinary = Buffer.from(archivo, 'base64');

    try {
        const client = new Client(
            {
                host: 'ec2-54-152-28-9.compute-1.amazonaws.com',
                user: 'rqczktdspsnatd',
                password: '0311f177e62edbfdbf9b343e27b8bb275c8f56a5c63f00db10d41c5f6efcf9b9',
                database: 'dfcs8o23udm9om',
                port: 5432,
            });
        console.log("Conectado a base de datos Boletin");
        await client.connect();


        await client.query(`insert into public.metas_cumplidas(boletin) values ($1);`, [pdfBinary], (err, res) => {
            if (!err) {
                console.log("-----Boletin agregado a base de datos local------");
            }
            else {
                console.log(err.message);
            }
        })
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    getConexion,
    saveBoletinMetasCumplidas
}




