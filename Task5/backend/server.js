const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const DATA_FILE = "db.json";

app.use(cors());
app.use(bodyParser.json());

// Read Data
app.get("/items", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error reading data" });
            return;
        }
        res.json(JSON.parse(data));
    });
});

// Create Data
app.post("/items", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Error reading data" });
            return;
        }
        let items = JSON.parse(data);
        const newItem = { id: Date.now(), name: req.body.name };
        items.push(newItem);

        fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), (err) => {
            if (err) {
                res.status(500).json({ error: "Error writing data" });
                return;
            }
            res.json(newItem);
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
