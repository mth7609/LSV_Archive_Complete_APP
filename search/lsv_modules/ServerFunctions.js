const express = require('express');
const appx = express();
const http = require('http');
const server = http.createServer(appx);
const initData = require('../init.json');
const mysql = require('mysql2');
const fs = require('fs');
const storage = require('node-storage');
const store = new storage('./storage2.dat');

function serverClose() {
    server.closeAllConnections();
    server.close();
    if (server.listening)
        console.log('ERROR: HTTP server still running');
    else
        console.log('HTTP server stopped');
}


function serverOpen() {
    server.listen(initData["httpPort"], () => {
        if (server.listening)
            console.log('HTTP Server listen on ' + initData["httpHost"] + ':' + initData["httpPort"]);
        else {
            console.log('ERROR: HTTP Server not listening on ' + initData["httpHost"] + ':' + initData["httpPort"] + ', trying again');
            setTimeout(() => {
                serverOpen();
            }, 3000);
            if (server.listening)
                console.log('HTTP Server listen on ' + initData["httpHost"] + ':' + initData["httpPort"]);
            else {
                console.log('ERROR: HTTP Server not listening on ' + initData["httpHost"] + ':' + initData["httpPort"] + ', killed!');
                process.kill(process.pid, 'SIGINT');
            }
        }
    });
}


async function sleepSecs(callCnt, secs) {
    callCnt++;
    if (callCnt < secs) {
        setTimeout(function () {
            sleepSecs(callCnt, secs);
        }, 1000);
    }
};


async function runForeverSecs(callCnt) {
    callCnt++;
    //log('Step forever: ' + callCnt);
    setTimeout(function () {
        runForeverSecs(callCnt);
    }, 1000);
};


function createDatasetFiles() {
    let maxSearchSets = initData["maxSearchSets"];
    for (let i = 1; i <= maxSearchSets; i++) {
        let searchFileName = "./SearchResult_" + i + ".html";
        let res;

        fs.open("./SearchResultTemplate.html", 'r', function (err, fileToRead) {
            if (!err) {
                fs.readFile(fileToRead, { encoding: 'utf-8' }, function (err, text) {
                    if (!err) {
                        let res = text.replace(/SC/g, i);
                        fs.writeFileSync(searchFileName, res);
                    } else {
                        console.log(err);
                    }
                });
            } else {
                console.log(err);
            }
        });
    }
}

function createNewSearchFile(nr) {
    let fn = "./SearchResult_" + nr + ".html";
    let res;
    console.log("createNewSearchResultFile: " + nr);
    fs.open("./SearchResultTemplate.html", 'r', function (err, fileToRead) {
        if (!err) {
            fs.readFile(fileToRead, { encoding: 'utf-8' }, function (err, text) {
                if (!err) {
                    let res = text.replace(/SC/g, nr);
                    fs.writeFileSync(fn, res);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
}


function deleteSearchFile(nr) {
    let fn = "./SearchResult_" + nr + ".html";
    let res;
    console.log("SearchResult file: " + fn);
    fs.unlinkSync(fn, 'r', function (err, stats) {
    });
}

module.exports = { deleteSearchFile, createNewSearchFile, store, appx, serverClose, serverOpen, sleepSecs, runForeverSecs, createDatasetFiles, mysql };
