const express = require('express')
const app = express();
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser')
const db = require('./database');
var respo;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const { router } = require('express');
const Buffer = require('buffer').Buffer;
fs.readFile('./countryList.json', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        respo = data;
    }
})
app.post('/', (req, res) => {
    const { name, dob, country, resume } = req.body;
    try {
        console.log(dob);
        db.promise().query(`Insert into users values('${name}','${dob}','${country}','${resume}')`);
        res.status(201).send('created User')
    }
    catch (error) {
        console.log(error);
    }


})
app.get('/', async (req, res) => {
    const results = await db.promise().query(`select * from users`);
    res.status(200).send(results[0]);
})

app.get('/country', (req, res) => {
    res.json(JSON.parse(respo))
})


app.listen(8000, () => {
    console.log("listening to 8000");
})