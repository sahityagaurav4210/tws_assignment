const https = require("https");

async function getDogFacts(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let response = "";
      res.on("data", (chunk) => {
        response += chunk;
      });

      res.on("end", () => {
        if (!response) reject("No response from api");
        else {
          response = JSON.parse(response);
          resolve(response);
        }
      });
    });
  });
}

module.exports = { getDogFacts };
