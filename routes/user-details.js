const express = require('express')
const router = express.Router()
var admin = require("firebase-admin");
const jwt = require("jsonwebtoken");

router.post('/users/details', async (req, res) => {
  try {
    if(!req.headers.authorization){
      return res.json({message: 'please provide authorization Bearer Token'});
    }
    let token = req.headers.authorization.replace('Bearer ', '');
    const data = await jwt.decode(token);
    const user = await admin.auth().getUserByEmail(data.uid)
    res.json(user)
  } catch (e) {
    res.json({ message: 'cannot fetch user data' })
  }
})

router.get('/users/name-check/:search', async (req, res) => {
  const search = req.params.search.toLowerCase();
  try {
    if(!req.headers.authorization){
      return res.json({message: 'please provide authorization Bearer Token'});
    }
    let token = req.headers.authorization.replace('Bearer ', '');
    const data = await jwt.decode(token);
    const user = await admin.auth().getUserByEmail(data.uid)
    userName =  user.displayName.toLowerCase()
    if (userName.startsWith(search)) {
      return res.json({searchResult: true});
    }
    return res.json({ searchResult: false })
  } catch (e) {
    res.json({ message: e.message })
  }
})
module.exports = router;