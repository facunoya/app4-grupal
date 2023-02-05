const express = require('express');
const path = require('path')
const fs = require('fs');
const userControllers = require('../controllers/userControllers');
const router = express.Router()
const methodOverride = require('method-override')

router.use(express.urlencoded({extended: false}))
router.use(express.json())
router.use(methodOverride('_method'))

router.get('/register', userControllers.getRegister)
router.post('/register', userControllers.register)
router.get('/edit/:id', userControllers.getEdit)
router.put('/edit/:id', userControllers.edit)
router.get('/delete/:id', userControllers.getDelete)
router.delete('/delete/:id', userControllers.delete)

module.exports = router