const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const path = require('path')
const session = require('express-session')/*session*/

app.use(express.json())
app.use(express.static('public'))
app.use(session({secret: 'Mi string secreto'}))/*session*/
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(userRoutes)


app.listen(3007, () => {
    console.log('Corriendo en puerto 3007')
})