console.log("Hello");

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(cors())

app.post('/register', (req, res) => {
    console.log("In server")
    res.send({
        message: `Hello! ${req.body.email}! Registered`
    })
})

app.listen(process.env.PORT || 8081)