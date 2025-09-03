const serverFunctions = require('./ServerFunctions');
const EventEmitter = require('events');
const initData = require('../init.json');
let tableNames = [];
let con;


const dsn = {
  host: initData['mysqlHost'],
  database: initData["mysqlDatabase"],
  user: initData["mysqlUser"],
  password: initData["mysqlPassword"],
  port: initData["mysqlPort"]
};

//console.log(dsn);


function databaseServerConnect() {
  con = serverFunctions.mysql.createConnection(dsn);
  serverFunctions.store.put("dbconnect", "NOK");
  con.connect(function (err) {
    if (err) {
      serverFunctions.store.put("dbconnect", "NOK");
      return null;
      //throw err;
    }
    else {
      serverFunctions.store.put("dbconnect", "OK");
    }
  });
  return con;
}


function databaseServerClose() {
  con.close();
}


function responseStates() {
  serverFunctions.appx.get('/requestStates', (req, res) => {
    con.query("SELECT name FROM states", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseOutputText() {
  serverFunctions.appx.get('/requestOutputText', (req, res) => {
    con.query("SELECT * FROM output_text", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}

function responseTopicHeadlines() {
  serverFunctions.appx.get('/requestTopicHeadlines', (req, res) => {
    con.query("SELECT * FROM topic_headlines order by headline_nr", function (err, result, fields) {
      if (err) throw err;
      tableNames = result;
      res.send(result);
    });
  });
}

function responseTopHeadlines() {
  serverFunctions.appx.get('/requestDatasetTopHeadlines', (req, res) => {
    con.query("SELECT * FROM dataset_top_headlines order by arraypos", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseInfoLabels() {
  serverFunctions.appx.get('/requestInfoLabels', (req, res) => {
    con.query("SELECT * FROM info_labels", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseTopicItems() {
  serverFunctions.appx.get('/0', (req, res) => {
    con.query("SELECT * FROM " + tableNames[0]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/1', (req, res) => {
    con.query("SELECT * FROM " + tableNames[1]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/2', (req, res) => {
    con.query("SELECT * FROM " + tableNames[2]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/3', (req, res) => {
    con.query("SELECT * FROM " + tableNames[3]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/4', (req, res) => {
    con.query("SELECT * FROM " + tableNames[4]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/5', (req, res) => {
    con.query("SELECT * FROM " + tableNames[5]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/6', (req, res) => {
    con.query("SELECT * FROM " + tableNames[6]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/7', (req, res) => {
    con.query("SELECT * FROM " + tableNames[7]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/8', (req, res) => {
    con.query("SELECT * FROM " + tableNames[8]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/9', (req, res) => {
    con.query("SELECT * FROM " + tableNames[9]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });


  serverFunctions.appx.get('/10', (req, res) => {
    con.query("SELECT * FROM " + tableNames[10]["tablename"], function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    })
  });
}


function responseImages() {
  serverFunctions.appx.get('/requestImages', (req, res) => {
    con.query("SELECT * FROM images", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseConstValues() {
  serverFunctions.appx.get('/requestConstants', (req, res) => {
    con.query("SELECT * FROM constants", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseInitValues() {
  serverFunctions.appx.get('/requestInitValues', (req, res) => {
    let initData = require('../init.json');
    res.send(initData);
  });
}


function responseCheckDatasetNumber() {
  serverFunctions.appx.get('/requestCheckDatasetNumber', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    con.query("SELECT nr FROM prolabor.archive_data WHERE dataset_number=" + dataset_number, (err, result, fields) => {
      if (err) throw err;
      if (result.length == 1)
        res.send(Object(1));
      else
        res.send(Object(0));
    });
  });
}


function responseDataset() {
  serverFunctions.appx.get('/requestDataset', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    con.query("SELECT * FROM archive_data where dataset_number=" + dataset_number, (err, result, fields) => {
      if (err) { throw err; }
      res.send(result);
    });
  });
}


function responseAllDatasetNumbers() {
  serverFunctions.appx.get('/requestAllDatasetNumbers', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    con.query("SELECT dataset_number FROM prolabor.archive_data", function (err, result, fields) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
}


function executeSimpleSQL(sqlQuery) {
  con.query(sqlQuery, function (err, result) {
    if (err) throw err;
    return result;
  });
}


function responseComment() {
  serverFunctions.appx.get('/requestComment', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    //log("nr: " + dataset_number);
    con.query("SELECT * FROM dataset_comments where dataset_number=" + dataset_number, (err, result, fields) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });
}


function responseSHA() {
  serverFunctions.appx.get('/requestSHA', (req, res) => {
    const user = req.query.user;
    //log("user: " + user);
    con.query("SELECT * FROM sha2 where userName='" + user + "'", (err, result, fields) => {
      if (err) {
        throw err;
      }
      //log(result);
      res.send(result);
    });
  });
}


function responseReleased() {
  serverFunctions.appx.get('/requestReleased', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    con.query("SELECT releasedWho FROM archive_data where dataset_number=" + dataset_number, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });
}


function responseLastUser() {
  serverFunctions.appx.get('/requestLastUser', (req, res) => {
    const dataset_number = req.query.datasetNumber;
    //log("dataset_number: " + dataset_number);
    con.query("SELECT lastUser FROM archive_data where dataset_number=" + dataset_number, (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    });
  });
}



responseStates();
responseTopicHeadlines();
responseTopHeadlines();
responseTopicItems();
responseOutputText();
responseInfoLabels();
responseImages();
responseInitValues();
responseConstValues();
responseDataset();
responseCheckDatasetNumber();
responseComment();
responseAllDatasetNumbers();
responseSHA();
responseReleased();
responseLastUser();

module.exports = { responseLastUser, responseReleased, databaseServerClose, responseAllDatasetNumbers, responseCheckDatasetNumber, responseAllDatasetNumbers, responseComment, executeSimpleSQL, responseDataset, responseInitValues, responseStates, databaseServerConnect, responseTopicHeadlines, responseTopHeadlines, responseOutputText, responseImages, responseConstValues, responseInfoLabels };