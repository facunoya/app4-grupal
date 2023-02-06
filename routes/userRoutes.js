const express = require('express');
const path = require('path')
const fs = require('fs');
const userControllers = require('../controllers/userControllers');
const router = express.Router()
const methodOverride = require('method-override')
const { body } = require('express-validator')
const userCreateValidation = [
    body('name').notEmpty().withMessage('Debes ingresar un nombre'),
    body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
    body('email').notEmpty().withMessage('Debes ingresar un correo')
]

router.use(express.urlencoded({extended: false}))
router.use(express.json())
router.use(methodOverride('_method'))

router.get('/register', userControllers.getRegister)
router.post('/register', userCreateValidation ,userControllers.register)
router.get('/edit/:id', userControllers.getEdit)
router.put('/edit/:id', userControllers.edit)
router.get('/delete/:id', userControllers.getDelete)
router.delete('/delete/:id', userControllers.delete)

module.exports = router