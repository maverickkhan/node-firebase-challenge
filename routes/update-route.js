const express = require('express')
const router=express.Router()
var admin = require("firebase-admin");
let db=admin.firestore();


router.post('/update',async (req,res) => {
    let docRef=db.collection('user').doc(req.body.user.name)
    await docRef.update({
      email:req.body.user.email,
      password:req.body.user.password,
    })
    res.json({message:'done'});
  })

  module.exports=router;