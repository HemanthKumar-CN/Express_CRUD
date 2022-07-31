const { json } = require("express");
const express = require("express");
const fs = require("fs");
const { resourceUsage } = require("process");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Workig");
});

app.get("/posts", (req, res) => {
  const posts = fs.readFileSync("./database.txt", "utf-8");
  res.send(posts);
});

app.post("/posts", (req, res) => {
  //   console.log(req.body);
  const data = JSON.stringify(req.body);

  fs.appendFileSync("./database.txt", data, "utf-8");
  res.send(req.body);
});

app.get("/attendance", (req, res) => {
  const result = fs.readFileSync("./database.json", "utf-8");
  const obj = JSON.parse(result);

  console.log(obj.attendance);

  res.send(obj);
});

app.post("/mark", (req, res) => {
  const data = req.body;

  const prev_data = fs.readFileSync("./database.json", "utf-8");
  const parsed_data = JSON.parse(prev_data);

  const { attendance } = parsed_data;

  //   console.log(attendance);
  attendance.push(data);

  const latest_data = JSON.stringify(parsed_data);

  //   console.log(latest_data);
  const final = fs.writeFileSync("./database.json", latest_data, "utf-8");
  res.send(latest_data);
});

app.patch("/modify", (req, res) => {
  const { id, new_time } = req.body;
  fs.readFile("database.json", "utf-8", (err, data) => {
    if (err) {
      return res.send("Something went wrong");
    }

    const prev_data = JSON.parse(data);
    const new_att = prev_data.attendance.map((el) => {
      if (el.id == id) {
        return { ...el, modified_time: new_time };
      } else {
        return el;
      }
    });

    prev_data.attendance = new_att;
    fs.writeFileSync("database.json", JSON.stringify(prev_data), "utf-8");
    res.send("Done..!!");
  });
});

app.listen(5000, () => {
  console.log("server started at port 5000");
});
