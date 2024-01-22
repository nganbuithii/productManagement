const express = require('express')
const app = express()
const port = 4000
const route = require("./routes/client/index.router")


app.set('views', './views')
app.set('view engine', 'pug')

app.use(express.static('public'))


//router
route(app);



app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})