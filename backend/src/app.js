const express = require('express');
const mongodb = require('mongodb').MongoClient;
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config()

const dbName = process.env.MONGO_INITDB_DATABASE;

let db;

const port = 8080;


//Mongo URL Connection
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;


app.listen(port, () => {
    console.log("connected to database", process.env.user, process.env.password, MONGO_URL);
    mongodb.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
        console.log(`Listening on port ${port}`);
        if (err) {
            console.log('Not Connected', err);
            return;
        }
        db = client.db(dbName);
        console.log('connected to database', dbName);
    });
    app.get('/search', (req, res) => {
        res.send({ data: dummy })
    })
})