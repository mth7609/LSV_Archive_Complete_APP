const { Worker, isMainThread, parentPort, workerData } = require('node:worker_threads')
const mysql = require('mysql2');
const initData = require('../init.json');

parentPort.on('message', (message) => {
    console.log("Entry checkDBLoop");
    checkDBLoop();
});

function checkDBLoop(i) {

    setTimeout(function () {
        con = mysql.createConnection({
            host: initData['mysqlHost'],
            database: initData["mysqlDatabase"],
            user: initData["mysqlUser"],
            password: initData["mysqlPassword"],
            port: initData["mysqlPort"]
        });

        con.connect(function (err) {
            if (err) {
                parentPort.postMessage('NOK');
            }
            else {
                parentPort.postMessage('OK');
            }
        });

        con.end();
        checkDBLoop();

    }, 5000);
};


module.exports = { checkDBLoop }

