const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  venue: {
    type: Schema.Types.ObjectId,
    ref: "Venue",
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});



module.exports = Comment = mongoose.model("comments", CommentSchema);
