const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');
const saltBcrypt = 27;

router.get(`/`,async (req,res)=>{
    const userList = await User.find().select('-passwordHash');

    if(!userList){
        res.status(500).json({success: false})
    }
    res.status(200).send(userList);
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');
  
    if (!user) {
      res
        .status(500)
        .json({ message: "The user with the given ID was not found." });
    }
    res.status(200).send(user);
  })

router.post(`/`, async (req,res)=>{
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        // passwordHash: bcrypt.hashSync(req.body.password,saltBcrypt),
        passwordHash: req.body.password,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save();
    
    if(!user)
        return res.status(404).send('the user cannot be created!');
    
    res.send(user);
})

router.put('/:id', async (req, res) =>{
    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password){
        // newPassword = bcrypt.hashSync(req.body.password,saltBcrypt)
        newPassword = req.body.password
    }else{
        newPassword = userExist.passwordHash
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            // passwordHash: bcrypt.hashSync(req.body.password,saltBcrypt),
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country
        },
        {new: true}
    )

    if(!user)
        return res.status(404).send('the user cannot be updated!');
    
    res.send(user);
})

router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(user){
            return res.status(200).json({success: true, message: 'the user was deleted'})
        } else {
            return res.status(404).json({success: false, message: 'user not found!'})
        }
    })
    .catch(err => {
        return resp.status(400).json({success: false, error: err})
    })
})

module.exports = router;