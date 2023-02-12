const express = require('express');
const path = require('path')
const fs = require('fs');
const userControllers = require('../controllers/userControllers');
const router = express.Router()
const methodOverride = require('method-override')
const { body } = require('express-validator')
const guestMiddleware = require('../middlewares/guestMiddleware')/*session*/
const authMiddleware = require('../middlewares/authMiddleware')/*session*/
const userCreateValidation = [
    body('name').notEmpty().withMessage('Por favor ingrese un nombre'),
    body('email').notEmpty().withMessage('Por favor ingrese un correo'),
    body('password').notEmpty().withMessage('Por favor ingrese una contraseña')
]

router.use(express.urlencoded({extended: true}))
router.use(express.json())
router.use(methodOverride('_method'))

router.get('/register', guestMiddleware ,userControllers.getRegister)
router.post('/register', userCreateValidation ,userControllers.register)
router.get('/edit/:id', userControllers.getEdit)
router.put('/edit/:id', userControllers.edit)
router.get('/delete/:id', userControllers.getDelete)
router.delete('/delete/:id', userControllers.delete)
router.get('/login', userControllers.getLogin)/*session*/
router.post('/login', userControllers.login)/*session*/
router.get('/home', authMiddleware, userControllers.getHome)
router.get('/check', (req, res) => {    /*Prueba de session */
    if(req.session.usuarioLogueado ==  undefined){
        res.send('No estas logueado')
    } else {
        res.send('Ya estas logueado')
    }
})

module.exports = router