const fs = require("fs");
const pg = require("pg");

const config = {
  user: "avnadmin",
  password: "AVNS_gZ6b7UWu0Ho36m-ZyV1",
  host: "pg-cf3a301-ecom25.k.aivencloud.com",
  port: "25020",
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0]);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});