const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const path = require('path')

app.use(express.json())
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(userRoutes)


app.listen(3007, () => {
    console.log('Corriendo en puerto 3007')
})