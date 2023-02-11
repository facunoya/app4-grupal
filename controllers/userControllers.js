const fs = require('fs')
const path = require('path')
const user = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf-8'))
const bcrytjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const Users = {
    getRegister: (req, res) =>{
        res.render('register')
    },
    generateId: () => {
        const allUsers  = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/user.json'), 'utf-8'))
        
        if( allUsers.length < 1){ return 1 } else { let nuevoId = allUsers.pop(); 
            return nuevoId.id + 1 } 
    },
    register: (req, res) => {
        let errors = validationResult(req)//requiero el error de las validaciones que cree en routes
        if(errors.isEmpty()){
            let userDB = user.filter(users => users.email == req.body.email)
            if(userDB.length < 1){
                let newUser = {//
                    id: Users.generateId(),
                    ...req.body,
                    password: bcrytjs.hashSync(req.body.password, 10)
                }
                user.push(newUser)
                fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(user, null, " "))
                res.send('usuario creado con éxito!')//
            } else {
                res.render('register', { "mensaje": "Ese correo ya se encuentra registrado, por favor ingrese otro", "old": req.body})
                //Esta funcion no me termina de convencer, me gustaria que pise el mensaje del err de email
            }
        } else {
            res.render('register', { "errors" : errors.array(), "old": req.body})
        }
    },
    getEdit: (req, res) => {
        let id = req.params.id
        let userToEdit = user.filter(x => x.id == id)
        res.render('editUser', { "user": userToEdit}) 
    },
    edit: (req, res) => {
        let modifyUser = user.map( x => {if(x.email == req.body.email){
            x = {
                id: x.id,
                ...req.body,
                password: bcrytjs.hashSync(req.body.password, 10)
            } 
            return x
        } return x 
        })    
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(modifyUser, null, " "))
        res.send('Usuario modificado con éxito!')
    },
    getDelete: (req, res) =>{
        id = req.params.id
        let userExports = user.filter(usuario => usuario.id == id)
        res.render('deleteUser', { "user": userExports})
    },
    delete: (req, res) =>{
        let userMail = req.body.email //necesita validación para ser eficiente
        let newUsers = user.filter(x => x.email != userMail)
        fs.writeFileSync(path.join(__dirname, '../data/user.json'), JSON.stringify(newUsers, null, " "))
        console.log(newUsers)
        res.send('Usuario ' + userMail + ' eliminado con éxito')
    }
}

module.exports =  Users