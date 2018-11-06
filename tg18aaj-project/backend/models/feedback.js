const mongoose = require('mongoose');

const feedSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('Feedback', feedSchema);
