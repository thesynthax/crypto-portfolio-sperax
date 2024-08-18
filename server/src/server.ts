import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import sqlite3 from "sqlite3";
import * as config from "../config/config.json" with { type: "json" };
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const BUILD: string = path.join(__dirname, "..", "build");

const DB_LOCATION = path.join(__dirname, '..', config.default.DATABASE_LOCATION);
const db = new sqlite3.Database(DB_LOCATION, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the SQLite3 database!');
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        name TEXT,
        email TEXT,
        walletAddress TEXT UNIQUE
    )`);
});

export interface Row {
    name: string;
    email: string;
    walletAddress: string;
}

app.use(bodyParser.json());

app.use(express.static(BUILD));
app.get("/", (req, res) => {
    res.sendFile(path.join(BUILD, "index.html"));
})

app.post("/api/v1/profile", async (req, res) => {
    
    const getQry = `SELECT walletAddress FROM users where walletAddress = ?`;
    const getValue = req.body[2];
    db.get(getQry, getValue, async (err, row: Row | undefined) => {
        if (row?.walletAddress) {
            const updateQry = `UPDATE users SET name = ?, email = ? where walletAddress = ?`;
            const updateValues = [req.body[0], req.body[1], row.walletAddress];
            db.run(updateQry, updateValues, (err) => {
                if (err) {
                    return res.status(500).send("Internal Server Error");
                }

                res.send();
                console.log('Profile updated');
            });
        } else {
            const insertQry = `INSERT INTO users (name, email, walletAddress) VALUES (?, ?, ?)`;
            const insertValues = [req.body[0], req.body[1], req.body[2]];
            db.run(insertQry, insertValues, (err) => {
                if (err) {
                    return res.status(500).send("Internal Server Error");
                }

                res.send();
                console.log('Profile saved');
            });
        }
    });
});

app.get('/api/v1/profile/:id', async (req, res) => {
    const walletAddress = req.params.id;

    const qry = `SELECT * FROM users WHERE walletAddress = ?`;
    const values = [walletAddress];
    db.get(qry, values, async (err, row: Row | undefined) => {
        if (err) {
            console.error('Error fetching file data:', err);
            return res.status(500).send(`Internal Server Error.`);
        }

        if (!row) {
            return res.status(200).send('new');
        }
        
        const name = row.name;
        const email = row.email;
        const responseObject = {
            name,
            email
        }

        return res.status(200).send(responseObject);
    });
});

app.listen(config.default.PORT, () => console.log("Server running!"));
