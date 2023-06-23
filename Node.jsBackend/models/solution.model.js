const mongoose = require("mongoose");
const schema = mongoose.Schema;

const comment_schema = new schema({
  user: String,
  user_id: String,
  reply: String,
  date: {
    type: Date,
    default: Date.now,
  },
  likes: String,
});

const solution_schema = new schema({
  language: String,
  title: String,
  content: String,
  explain: String,
  author: String,
  author_id: String,
  likes: String,
  comment: [comment_schema],
  date: {
    type: Date,
    default: Date.now,
  }
});

const Solution = mongoose.model("solutions", solution_schema);

module.exports = { Solution };
