'use strict';

const { generate } = require('cyberflake');
const { randomBytes } = require('crypto');
const tokenCollection = require('./src/models/token');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

function genereteToken() {
  let str = randomBytes(8).toString('hex');
  let flake = generate();

  let a = flake.split('').filter(Boolean);
  let b = str.split('');
  let mergedString = '';

  for (let i = 0; i < a.length || i < b.length; i++) {
    if (i < a.length) { mergedString += a[i]; }
    if (i < b.length) { mergedString += b[i]; }
  }

  return mergedString;
}

exports.Token = class Token {
  constructor() {
    this.timestamp = Date.now();
    this.str = genereteToken();
    return this;
  }
};

exports.requestTokenValidate = class TokenValidation {
  constructor(headers, query) {
    let token = null;
    this.isValid = false;
    if (headers.authorization && headers.authorization.startsWith('Bearer ')) {
      token = headers.authorization.slice(7, headers.authorization.length);
    } else if (query && query.access_token) {
      token = query.access_token;
    } else {
      return this;
    }

    // TODO: database query, validation, increase ratelimit numbers
    if (token) {
      if (token === '2f3f1316802e172c4546672f56065d9584') {
        this.isValid = true;
      } else {
        // let isExist = this._check(token);
        // if (isExist) this.isValid = true;
      }
    } else {
      return this;
    }
    return this;
  }

  // async _check(token) {
  //   let response = await tokenCollection.findOne({ str: token });
  //   if (response) {
  //     // do something
  //   } else {
  //     return false;
  //   }
  // }
};

exports.Database = class Database {
  constructor() {
    this.db = {
      url: 'localhost',
      port: '27017',
      name: 'MoltenCraft',
    };
  }

  connection(opt = {}) {
    let url = opt.url || this.db.url;
    let port = opt.port || this.db.port;
    let name = opt.name || this.db.name;
    mongoose.connect(`mongodb://${url}:${port}/${name}`,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
      .then((db, err) => {
        if (!err) console.log(`Connected with: ${db.connections[0].name}`);
      })
      .catch(err => console.error(err));
  }
};
