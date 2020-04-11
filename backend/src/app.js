const express = require('express');
const mongodb = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config()


const dummy = require('./dummy');
const dbName = process.env.MONGO_INITDB_DATABASE;

let db;

const port = 8080;


//Mongo URL Connection
const MONGO_URL = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;



app.get('/list', (req, res) => {
    const collection = db.collection('ngo');
    collection.find({}).toArray(function (err, docs) {
        res.send(docs);
    });

})


app.post('/claim', (req, res) => {
    const collection = db.collection('ngo');
    collection.updateOne({ '_id': ObjectID(req.body._id) }, { $set: { claimed: true } }, function (err, result) {
        res.send(result);
    });

})


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

        const collection = db.collection('ngo');
        console.log(collection.count())

        collection.count().then((count) => {
            if (count === 0) {
                db.collection("ngo").insertMany(dummy, function (err, res) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + res.insertedCount);
                });
            }
        })

    });
})
