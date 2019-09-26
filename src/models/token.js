'use strict';

const { model, Schema } = require('mongoose');

const tokenSchema = new Schema(
  {
    id: { type: String, unique: true },
    str: String,
    limit: {
      max: Number,
      used: Number,
      interval: Number,
    },
    created: Number,
  },
  { versionKey: false }
);

module.exports = model('token', tokenSchema);
