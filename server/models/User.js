const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  todos: {type: [{type: Schema.Types.ObjectId, ref: 'Todo'}], default: []}
});

module.exports = mongoose.model('User', userSchema);