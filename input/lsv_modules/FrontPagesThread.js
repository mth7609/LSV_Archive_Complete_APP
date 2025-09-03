const { Worker, parentPort, workerData } = require('node:worker_threads')


parentPort.on('message', (message) => {
    console.log("Entry frontPageLoop");
    frontPagesLoop(0);
});


function frontPagesLoop(i) {
    setTimeout(function () {
        parentPort.postMessage(img[i]);
        if ((i++) >= img.length - 1)
            i = 0;
        frontPagesLoop(i);
    }, 4000);
};


function readFrontPageFiles() {
    let i;
    let f = [];
    var fs = require('fs');
    var files = fs.readdirSync('./images/').filter(fn => fn.startsWith('front_page_'));
    return files;
}

let img = readFrontPageFiles();

module.exports = { frontPagesLoop }

