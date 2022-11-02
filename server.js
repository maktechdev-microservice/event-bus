import express from "express"
import axios from "axios"
import BodyParser from "body-parser"

const app = express()
app.use(BodyParser.json())

const port = 4005

const events = []

app.get("/events", (req, resp) => {

    resp.send("<h1>Hello from Event Bus</h1>")
})

app.post("/events",  async (req, res) => {
    const event = req.body
    console.log(`Event: ${event.type}`)
    events.push(event)
    const url = (p) => `http://localhost:${p}/events`
    const receivingPorts = [4000, 4001, 4002, 4003]

    receivingPorts.map(async (p) => {
        await axios.post(url(p), event).catch(err => {
            console.log(`Event Bus reports: ${err} to post to ${p}`)
        }
        )
    })
    res.send({status: 'OK'})
})

app.listen(port, () => console.log(`Event Bus service listening ${port}`))