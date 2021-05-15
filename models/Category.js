const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Categories', categorySchema);