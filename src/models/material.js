'use strict';

const { model, Schema } = require('mongoose');

const materialSchema = new Schema(
  {
    id: { type: String, unique: true },
    name: String,
    icon: String,
    expansion: {
      name: String,
      slug: String,
    },
    type: {
      name: String,
      slug: String,
    },
    time: {
      added: Number,
      updated: Number,
    },
  },
  { versionKey: false }
);

module.exports = model('material', materialSchema);
