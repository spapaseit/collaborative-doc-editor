import express, { Request } from "express";
import sqlite3 from "sqlite3";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import fs from "fs";

const sqlite = sqlite3.verbose();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const dbFile = path.join(__dirname, "versionHistory.db");
const dbExists = fs.existsSync(dbFile);

const db = new sqlite.Database(dbFile);

interface IRow {
    id: number;
    documentName: string;
    version: number;
    content: string;
    createdAt: string;
}

if (!dbExists) {
    db.serialize(() => {
        db.run(`CREATE TABLE Versions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        documentName TEXT,
                        version INTEGER,
                        content TEXT,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);
    });
}

// Save a new version
app.post("/saveVersion", (req: Request<{}, any, { documentName: string; content: string }>, res) => {
    const { documentName, content } = req.body;

    db.get<{ latestVersion: number }>(`SELECT MAX(version) as latestVersion FROM Versions WHERE documentName = ?`, [documentName], (err, row) => {
        if (err) {
            res.status(500).send("Error querying the database");
            return;
        }

        const versionNumber = row.latestVersion ? row.latestVersion + 1 : 1;

        db.run(`INSERT INTO Versions (documentName, version, content) VALUES (?, ?, ?)`, [documentName, versionNumber, JSON.stringify(content)], function (err) {
            if (err) {
                res.status(500).send("Error inserting into the database");
                return;
            }

            res.status(200).send("Version saved");
        });
    });
});

// Get all versions of a document
app.get("/versions/:documentName", (req: Request<{ documentName: string }>, res) => {
    const { documentName } = req.params;

    db.all<IRow>(`SELECT * FROM Versions WHERE documentName = ? ORDER BY version DESC`, [documentName], (err, rows) => {
        if (err) {
            res.status(500).send("Error querying the database");
            return;
        }

        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
