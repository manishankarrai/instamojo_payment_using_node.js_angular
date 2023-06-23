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

const author_schema = new schema({
 name: String ,
 email: String ,
 mobileno: String ,
 dob: String ,
 password: String ,
created_at: {
    type: Date,
    default: Date.now,
  }
});

const Author = mongoose.model("authors", author_schema);

module.exports = { Author };
