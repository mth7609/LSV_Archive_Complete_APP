

/*

function backup() {                        // From dir to dir
  if (initData["backupAllow"] == "no")
    return;
  const srcDir = initData["dbSourceDir"];
  const backupDate = new Date();
  const destDir = initData["backupDir"] + backupDate.getFullYear() + "-" + (backupDate.getMonth() + 1) + "-" + backupDate.getDate();
  console.log("Last backup on: " + serverFunctions.store.get("lastBackup"))
  if (destDir != serverFunctions.store.get("lastBackup")) {
    fs.cp(srcDir, destDir, { recursive: true }, (err) => {
      if (err) throw err;
    });
    console.log("New backup to: " + destDir + ",  from source: " + srcDir);
  }
  serverFunctions.store.put("lastBackup", destDir);
}



function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout);
  });
}


async function sleepSecs(callCnt, secs) {       // Template
    callCnt++;
    if (callCnt < secs) {
        setTimeout(function () {
            sleepSecs(callCnt, secs);
        }, 1000);
    } else
        parentPort.postMessage('Sleep for seconds: ' + secs);

};

async function runForeverSecs(callCnt) {        // Template
    callCnt++;
    parentPort.postMessage('Step forever: ' + callCnt);
    setTimeout(function () {
        runForeverSecs(callCnt);
    }, 1000);
};


function sleepMilliSecs(milliSecs) {
    function getCurrentTime() {
        return new Date().getTime();
    }

    const startTime = getCurrentTime();
    let stopLoop = false;
    let currentTime;

    while (1 && !stopLoop) {
        currentTime = Math.round(getCurrentTime() - startTime);
        if (currentTime >= milliSecs) {
            stopLoop = true;
        }
    }
};


function startMySqlService() {
    const poshInstance = async () => {
        const ps = new PowerShell({
            executionPolicy: 'Default',
            noProfile: true
        })

        const command = PowerShell.command`net start mySQL80`;
        const output = await ps.invoke(command);
        ps.dispose();
    }

    (async () => {
        poshInstance()
    })();
}

function stopMySqlService() {
    const poshInstance = async () => {
        const ps = new PowerShell({
            executionPolicy: 'Default',
            noProfile: true
        })

        const command = PowerShell.command`net stop mySQL80`;
        const output = await ps.invoke(command);
        ps.dispose();
    }

    (async () => {
        poshInstance()
    })();
}


function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getActualFullDate() {
    var d = new Date();
    var day = addZero(d.getDate());
    var month = addZero(d.getMonth() + 1);
    var year = addZero(d.getFullYear());
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return day + "." + month + "." + year + " (" + h + ":" + m + ")";
}


++++++++++++++++++++++++ Promise sample

function execStatement(con, statement) {
  let p = new Promise(function (res, rej) {
    con.query(statement, function (err, result) {
      if (err) throw err;
      else res(result);
    });
  });
  return p;
}

function executeReceiveDataset(sqlQuery) {
  let conSave = serverFunctions.mysql.createConnection({
    host: "localhost",
    user: "prolabor",
    password: "mzkti29b",
    database: "prolabor"
  });

  execStatement(conSave, sqlQuery)
    .then(function (result) {
      do something with result;
    })
    .catch(function () { throw err })
    .finally(function () { conSave.end() });
}

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Function printPage() {
    var w = window.open();

    var headers = $("#headers").html();
    var field = $("#field1").html();
    var field2 = $("#field2").html();

    var html = "<!DOCTYPE HTML>";
    html += '<html lang="en-us">';
    html += '<head><style></style></head>';
    html += "<body>";

    //check to see if they are null so "undefined" doesnt print on the page. <br>s optional, just to give space
    if (headers != null) html += headers + "<br/><br/>";
    if (field != null) html += field + "<br/><br/>";
    if (field2 != null) html += field2 + "<br/><br/>";

    html += "fdgr jgör jkaöä kaör glkoma ölkm</body>";
    w.document.write(html);
    w.window.print();
    w.document.close();
};


*/