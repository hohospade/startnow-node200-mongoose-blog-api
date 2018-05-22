const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const blogSchema = new Schema({
  title: { type: String, required: true }, // firstName property is a string and required
  article: { type: String, required: true },
  published: { type: Date, required: true },
  featured: { type: Boolean, required: true },
  authorId: { type: Object, required: false },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});



module.exports = mongoose.model('Blog', blogSchema);


