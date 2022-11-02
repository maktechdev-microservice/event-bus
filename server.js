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
    const url = (ip) => `http://${ip}/events`
    const receivingIPs = ['posts-clusterip-srv:4000', 'comments-clusterip-srv:4001', 'query-clusterip-srv:4002', 'moderator-clusterip-srv:4003']

    receivingIPs.map(async (d) => {
        await axios.post(url(d), event).catch(err => {
            console.log(`Event Bus reports: ${err} to post to ${d}`)
        }
        )
    })
    res.send({status: 'OK'})
})

app.listen(port, () => console.log(`Event Bus service listening ${port}`))