const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Value = require('../schema/value')


router.get('/', (req,res,next) =>{
    Value.find()
    .exec()
    .then(result =>{
        
        res.status(200).json(result)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

router.post('/', (req,res,next)=>{

    const value = new Value({
        _id: new mongoose.Types.ObjectId(),
        mass1:req.body.mass1,
        mass2:req.body.mass2,
        rawValue1: req.body.rawValue1,
        rawValue2: req.body.rawValue2
    });

    value.save()
    .then(result =>{
        console.log(result)
        res.status(201).json({
            message:"Value saved"
        })

    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
             error: err
        })
    })
    
})

module.exports = router;