const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()
const app = express()
const path = require('path')
const  cors = require('cors')
const port = process.env.PORT || 3000
const urlRoutes = require('./routes/url.js')
const {redirect}=require('./controllers/url.controller.js');
const _dirname = path.resolve()
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB")
})
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(_dirname,'/Frontend/dist')))


app.use("/api",urlRoutes)
app.get('/:shortenid',redirect)


app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, 'Frontend/dist/index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
