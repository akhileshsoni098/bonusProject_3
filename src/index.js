const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const app = express()
app.use(express.json())


mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://nehajaiswal:neha123@nehadb.pcorgpc.mongodb.net/group15Database", {
    useNewUrlParser: true,
})
    .then(() => console.log("DB is Connected"))
    .catch(error => console.log(error))

app.use("/", route)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})