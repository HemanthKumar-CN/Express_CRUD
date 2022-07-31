const http = require("http");
const fs = require("fs");

const server = http
  .createServer((req, res) => {
    if (req.url == "/") {
      try {
        const data = fs.readFileSync("./data.txt", "utf-8");
        res.end(data);
      } catch (error) {
        res.end("Something went wrong, plz try again..!");
      }
    } else if (req.url == "/stream") {
      const dataStream = fs.createReadStream("./data.txt", "utf-8");
      dataStream.pipe(res);
    }
  })
  .listen(5000, () => {
    console.log("listening to port 5000");
  });
