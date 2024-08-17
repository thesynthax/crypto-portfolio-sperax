import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import sqlite3 from "sqlite3";
import * as config from "../config/config.json" with { type: "json" };
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import basicAuth from "basic-auth";

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

app.post("/profile", async (req, res) => {
    
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
/*
    */

});
/*
app.get('/files/:id', async (req, res) => {
    const fileId = req.params.id;

    const qry = `SELECT * FROM users WHERE uniqueId = ?`;
    const values = [fileId.split('.')[0]];
    db.get(qry, values, async (err, row: Row | undefined) => {
        if (err) {
            console.error('Error fetching file data:', err);
            return res.status(500).send(`Internal Server Error.`);
        }

        if (!row) {
            return res.status(404).send('File not found');
        }
        
        const filepath = row.filepath;
        const filetype = row.mimetype;
        const password = row.password;
        if (filetype) {
            res.setHeader('Content-Type', filetype);

            if (password === "") {
                res.sendFile(filepath, (err) => {
                    if (err) {
                        console.error('Error serving file:', err);
                        return res.status(500).send(`Internal Server Error.`);
                    }
                    console.log('File served successfully!');
                });
                return;
            }

            const credentials = basicAuth(req);

            if (!credentials) {
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure File Access"');
                return res.status(401).send('Unauthorized');
            }

            const isPassCorrect = await bcrypt.compare(credentials.pass, password);

            if (isPassCorrect) {
                res.sendFile(filepath, (err) => {
                    if (err) {
                        console.error('Error serving file:', err);
                        return res.status(500).send(`Internal Server Error.`);
                    }
                    console.log('File served successfully!');
                });
            } else {
                res.setHeader('WWW-Authenticate', 'Basic realm="Secure File Access"');
                res.status(401).send('Unauthorized');
            }

        } else {
            res.status(415).send('Unsupported Media type');
        }
    });

})
*/
app.listen(config.default.PORT, () => console.log("Server running!"));
