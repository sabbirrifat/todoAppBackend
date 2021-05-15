const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category_id:{
        type: String,
        required: true
    },
    completed:{
        type: Boolean,
        required: true
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Todos', todoSchema);