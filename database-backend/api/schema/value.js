const mongoose = require('mongoose');


const valueSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mass1:{type:Number, required:true},
    mass2:{type:Number, required:true},
    rawValue1: {type:Number, required:true},
    rawValue2: {type:Number, required:true}
});

module.exports = mongoose.model('Value', valueSchema);