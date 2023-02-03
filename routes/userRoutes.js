const express = require('express');
const path = require('path')
const fs = require('fs');
const userControllers = require('../controllers/userControllers');
const router = express.Router()

router.use(express.urlencoded({extended: false}))
router.use(express.json())

router.get('/register', (req, res) => {
    res.render('register')
})
router.post('/register', userControllers.register)



module.exports = router