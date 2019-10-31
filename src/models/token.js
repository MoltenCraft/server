'use strict';

const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
  {
    id: { type: String, unique: true },
    str: String,
    private: Boolean,
    limit: {
      long: {
        max: Number,
        used: Number,
        interval: Number,
      },
      short: {
        max: Number,
        used: Number,
        interval: Number,
      },
    },
    last: Number,
    created: Number,
  },
  { versionKey: false }
);

module.exports = model('token', tokenSchema);
