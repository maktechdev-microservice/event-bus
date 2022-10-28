import express from "express"
import axios from "axios"
import BodyParser from "body-parser"

const app = express()
app.use(BodyParser.json())

const port = 4005

app.post("/events", (req, res) => {
    const event = req.body
    const url = (p) => `http://localhost/${p}/events`
    const receivingPorts = [4000, 4001]
    receivingPorts.map(async (p) => await axios.post(url(p), event).catch(err => {
        console.log(`error ${err}`)
    }
    ))
    res.send({status: 'OK'})
})

app.listen(port, () => console.log(`Event Bus service listening ${port}`))