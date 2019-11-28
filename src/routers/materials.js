'use strict';

const { requestTokenValidate } = require('../../config');
const materialsCollection = require('../models/material');
const Router = require('express').Router();

Router.get('/', async (req, res) => {
  let { isValid } = new requestTokenValidate(req.headers, req.query);
  if (!isValid) {
    res.status(401).json({ code: 400, message: 'Unauthorized' });
  } else {
    // TODO: get data from db
    let items = await materialsCollection.find().exec();
    res.status(200).json(items);
    // res.status(200).json({ code: 200, message: 'Request Success' });
  }
});

module.exports = Router;
