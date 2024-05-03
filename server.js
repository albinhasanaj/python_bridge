const express = require("express")
const child_process = require("child_process")
const path = require("path")
const app = express()

let port = 3000

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile("index")
})

app.post("/chatgpt", (req, res) => {
    const userText = req.body.userText
    const external = child_process.spawn("python", ["./python/gpt.py", userText])

    let message = ""

    external.stdout.on("data", (data) => {
        message += data.toString()
        res.json({ message: message, priorText: userText })
    })
})

app.listen(port, () => {
    console.log("Listening on port " + port)
})