'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Database } = require('../config');
const database = new Database();

const materials = require('./routers/materials');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/materials', materials);

database.connection();
app.listen(3000);
