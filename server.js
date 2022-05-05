const express=require('express')
const port = process.env.PORT || 3000
const path=require('path')
const app = express()
require('dotenv').config()
app.use(express.urlencoded({extended:true}))
app.use(express.json());

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nestjsauth-31c4f-default-rtdb.firebaseio.com/", 
  storageBucket:  'gs://nestjsauth-31c4f.appspot.com/' 
});
app.locals.bucket = admin.storage().bucket()

const userdetailsRoutes=require('./routes/user-details')
const usersignRoutes=require('./routes/user-sign')
const userdeleteRoutes=require('./routes/delete-user')
const usercreateRoutes=require('./routes/create-user')
const usergetRoutes=require('./routes/get-user')
app.use(userdetailsRoutes)
app.use(usersignRoutes)
app.use(userdeleteRoutes)
app.use(usercreateRoutes)
app.use(usergetRoutes)

app.listen(port, (req,res)=>{
  console.info(`Running on ${port}`)
})